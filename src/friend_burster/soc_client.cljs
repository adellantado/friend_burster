(ns friend_burster.soc_client
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require
   [figwheel.client :as fw :include-macros true]
   [goog.dom :as dom]
   [goog.events :as events]
   [cljs.core.async :as async :refer [>! <! put! chan alts!]])
  (:import [goog.events EventType])
  )

(enable-console-print!)


 ;;(print async/version)

(defn events->chan
  "Given a target DOM element and event type return a channel of
  observed events. Can supply the channel to receive events as third
  optional argument."
  ([el event-type] (events->chan el event-type (chan)))
  ([el event-type c]
     (events/listen el event-type
                    (fn [e] (put! c e)))
     c))

(defn mouse-loc->vec
  "Given a Google Closure normalized DOM mouse event return the
  mouse x and y position as a two element vector."
  [e]
    [(.-clientX e) (.-clientY e)])


(defn ex6 []
  (let [button (dom/getElement "canvas")
        clicks (events->chan button EventType.CLICK)
        mouse  (events->chan js/window EventType.MOUSEMOVE
                             (chan 1 (map mouse-loc->vec))
                             ;(chan)
                             )]
    (go
      (print "Click button to start tracking the mouse!")
      (<! clicks)
      (print "clicked")
      (loop []
        (let [[v c] (alts! [mouse clicks])]
          (cond
           (= c clicks) (print "Done!")
           :else
           (do
             (print (pr-str v))
                           (recur))))))))

(ex6)


#_(go
  (while true
    (alts! [(chan) (chan)])))

#_(let [a (chan)
      b (chan)]
  (go
    (loop []
      (print (alts! [a b])))))


(defn listen [el type]
  (let [out (chan)]
    (events/listen el type
                   (fn [e] (put! out e)))
    out))





(defn start [] (do (print "start!")
                   ;;(init-stuff)
                   ))

(def xxxx "my string")


;;(set! (.-onerror webSocket) (fn [error] (print error)))

(defonce state (atom {}))
(defonce PI (aget js/Math "PI"))

(defn spown-user [id x y c]
  (let [user {:id id :x x :y y :color c}]
    (swap! state assoc id user)))

(defn test-state []
  ;;(print (@state "zzz"))
  (print @state)
  ;;(doseq [user @state](print user))
  )


(defn draw-circle [ctx x y r col]
  (doto ctx
    .beginPath
    (.arc x y r 0 (* 2 PI) false)
    (aset "fillStyle" col)
    .fill))


(defn draw-frame [cnv ctx]
  (doto ctx
    .beginPath
    ;(aset  "lineWidth" "1")
    (.rect 0.5 0.5 (- (.-width cnv) 1) (- (.-height cnv) 1))
    .stroke))

(defn draw-frame-util []
  (let [cnv (dom/getElement "canvas")
        ctx (.getContext cnv "2d")]
    (draw-frame cnv ctx)))


(defn render []
  (let [canvas (.getElementById js/document "canvas")
        ctx (.getContext canvas "2d")]
    (.clearRect ctx 0 0 (.-width canvas) (.-height canvas))
    (doseq [[_ {x :x y :y col :color}] @state]
      (draw-circle ctx x y 10 col))))

(defn clear []
  (let [canvas (.getElementById js/document "canvas")
        ctx (.getContext canvas "2d")]
    (.clearRect ctx 0 0 (.-width canvas) (.-height canvas))))

(defn rnd [max]
  (* max (.random js/Math)))


(defn on-message [evt]
  (let [
        data (.-data evt)
        command "move"]
;    (print data)
    (case command
      "move" (let [new-x 50
                   new-y 30
                   user-id "zzz"]
               (print data)
               ;; updating state
               (swap! state assoc user-id (assoc (@state user-id) :x new-x :y new-y))
               (render))
      "list" (let [data-list []
                   new-id ""
                   new-y 0
                   new-x 0
                   new-col (str "rgb(" (rnd 255) "," (rnd 255) "," (rnd 255) ")")
                   ;list (map (fn [item] ()) data-list)
                   ]
               (spawn-user ))
      (print "unknown command:" command))))


(defn create-ws []
  (let [ws (js/WebSocket.
             "ws://10.249.134.74:8080/examples/websocket/echoProgrammatic")]
    (doto ws
        (aset "onerror" (fn [error] (print "some error" (.-data error))))
        (aset "onopen" (fn [evt] (print "connection OK")))
        (aset "onmessage" on-message)
        (aset "onclose" (fn [evt] (print "Socket has been closed: " (.-data evt)))))))










;;(clear)
;;(draw-frame-util)


(defn init-stuff []
  (let [canvas (dom/getElement "canvas")
        down (listen canvas "mousedown")
        up (listen canvas "mouseup")
        move (listen canvas "mousemove")]

    #_(go
      (loop []
        (let [ch (<! up)]
          (do
            (.log js/console val "zzsssdd") (recur)))))

    #_(go (loop []
          (let [[val ch] (alt! [down up move])]
            (condp = ch
              down (do (.log js/console "downnn") (recur))
              up (do (.log js/console "downnn") (recur))
              move (do (.log js/console "downnn") (recur))
              (recur)))))


    #_(go
      (while true
        (.log js/console
              (alts! [up down]) "cooll")))))

(init-stuff)

;;-----------------------------------------------
(fw/watch-and-reload
  :websocket-url   "ws://localhost:3449/figwheel-ws"
  :jsload-callback (fn [] (print "reloaded")))
