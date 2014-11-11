(ns friend_burster.core
  (:require
   [figwheel.client :as fw :include-macros true]))

(enable-console-print!)

(defn ^:export fooo [] (.log js/console "zzz n"))

(def xxxx "my string")


(defn ^:export addWaving [baloon]
  (let [p1 (- (.-x baloon) 50)
        p2 (+ (.-x baloon) 50)
        p3 (.-x baloon)]
    ;; (.log js/console p3)
    (->
      js/createjs.Tween
      (.get baloon (js-obj "loop" true) true)
      (.to (js-obj "x" p1) 500  (.-sineOut js/createjs.Ease))
      (.to (js-obj "x" p2) 1000 (.-sineInOut js/createjs.Ease))
      (.to (js-obj "x" p3) 500  (.-sineIn js/createjs.Ease))
  )))


(fw/watch-and-reload
  :websocket-url   "ws://localhost:3449/figwheel-ws"
  :jsload-callback (fn [] (print "reloaded")))
