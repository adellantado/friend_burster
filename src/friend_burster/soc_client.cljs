(ns friend_burster.soc_client
  (:require
   [figwheel.client :as fw :include-macros true]))

(enable-console-print!)

(defn start [] (print "start!"))

(def xxxx "my string")

(def webSocket (js/WebSocket. "ws://localhost:9998/echo"))

;;(set! (.-onerror webSocket) (fn [error] (print error)))

(-> webSocket
    (aset "onerror" (fn [error] (print "some error" (.-data error))))
    (aset "onopen" (fn [evt] (print "connection OK"))))



(fw/watch-and-reload
  :websocket-url   "ws://localhost:3449/figwheel-ws"
  :jsload-callback (fn [] (print "reloaded")))
