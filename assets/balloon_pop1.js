(function(window) {
balloon_pop_instance_1 = function() {
	this.initialize();
}
balloon_pop_instance_1._SpriteSheet = new SpriteSheet({images: ["balloon_pop1.png"], frames: [[0,0,298,265,0,42.6,20.5],[0,265,298,265,0,42.6,20.5],[0,530,298,265,0,42.6,20.5],[0,795,298,265,0,42.6,20.5],[0,1060,298,265,0,42.6,20.5],[0,1325,298,265,0,42.6,20.5],[0,1590,298,265,0,42.6,20.5],[298,0,298,265,0,42.6,20.5],[298,265,298,265,0,42.6,20.5],[298,530,298,265,0,42.6,20.5],[298,795,298,265,0,42.6,20.5],[298,1060,298,265,0,42.6,20.5],[298,1325,298,265,0,42.6,20.5],[298,1590,298,265,0,42.6,20.5],[596,0,298,265,0,42.6,20.5],[596,265,298,265,0,42.6,20.5],[596,530,298,265,0,42.6,20.5],[596,795,298,265,0,42.6,20.5],[596,1060,298,265,0,42.6,20.5],[596,1325,298,265,0,42.6,20.5]]});
var balloon_pop_instance_1_p = balloon_pop_instance_1.prototype = new BitmapAnimation();
balloon_pop_instance_1_p.BitmapAnimation_initialize = balloon_pop_instance_1_p.initialize;
balloon_pop_instance_1_p.initialize = function() {
	this.BitmapAnimation_initialize(balloon_pop_instance_1._SpriteSheet);
	this.paused = false;
}
window.balloon_pop_instance_1 = balloon_pop_instance_1;
}(window));

