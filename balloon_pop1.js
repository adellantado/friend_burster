(function(window) {
balloon_pop_instance_1 = function() {
	this.initialize();
}
balloon_pop_instance_1._SpriteSheet = new SpriteSheet({images: ["balloon_pop1.png"], frames: [[0,0,373,371,0,82.55,58.9],[0,371,373,371,0,82.55,58.9],[0,742,373,371,0,82.55,58.9],[0,1113,373,371,0,82.55,58.9],[0,1484,373,371,0,82.55,58.9],[373,0,373,371,0,82.55,58.9],[373,371,373,371,0,82.55,58.9],[373,742,373,371,0,82.55,58.9],[373,1113,373,371,0,82.55,58.9],[373,1484,373,371,0,82.55,58.9],[746,0,373,371,0,82.55,58.9],[746,371,373,371,0,82.55,58.9],[746,742,373,371,0,82.55,58.9],[746,1113,373,371,0,82.55,58.9],[746,1484,373,371,0,82.55,58.9],[1119,0,373,371,0,82.55,58.9],[1119,371,373,371,0,82.55,58.9],[1119,742,373,371,0,82.55,58.9],[1119,1113,373,371,0,82.55,58.9],[1119,1484,373,371,0,82.55,58.9]]});
var balloon_pop_instance_1_p = balloon_pop_instance_1.prototype = new BitmapAnimation();
balloon_pop_instance_1_p.BitmapAnimation_initialize = balloon_pop_instance_1_p.initialize;
balloon_pop_instance_1_p.initialize = function() {
	this.BitmapAnimation_initialize(balloon_pop_instance_1._SpriteSheet);
	this.paused = false;
}
window.balloon_pop_instance_1 = balloon_pop_instance_1;
}(window));

