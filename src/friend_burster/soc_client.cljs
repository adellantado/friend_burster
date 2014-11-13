(ns friend_burster.soc_client
  (:require
   [figwheel.client :as fw :include-macros true]))

(enable-console-print!)

(defn start [] (print "start!"))

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



(defn render []
  (let [canvas (.getElementById js/document "canvas")
        ctx (.getContext canvas "2d")]
    (.clearRect ctx 0 0 (.-width canvas) (.-height canvas))
    (doseq [[_ {x :x y :y col :color}] @state]
      (draw-circle ctx x y 10 col))))




(defn create-ws []
  (let [ws (js/WebSocket.
             "ws://10.249.134.74:8080/examples/websocket/echoProgrammatic")]
    (doto ws
        (aset "onerror" (fn [error] (print "some error" (.-data error))))
        (aset "onopen" (fn [evt] (print "connection OK")))
        (aset "onmessage" on-message)
        (aset "onclose" (fn [evt] (print "Socket has been closed: " (.-data evt)))))))

(defn rnd [max]
  (* max (.random js/Math)))


(defn on-message [evt]
  (let [
        ;; data (.-data evt)
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
               (spown-user ))
      (print "unknown command:" command))))


(defn draw-circle [ctx x y r col]
  (doto ctx
    .beginPath
    (.arc x y r 0 (* 2 PI) false)
    (aset "fillStyle" col)
    .fill))


(fw/watch-and-reload
  :websocket-url   "ws://localhost:3449/figwheel-ws"
  :jsload-callback (fn [] (print "reloaded")))
