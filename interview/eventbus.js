yongboy = {};

yongboy.eventbus = {
 listeners : {
  list : {},
  add : function(event, fn) {
   this.list[event] = fn;
  },
  remove : function(event) {
   this.list[event] = null;
  }
 },

 subscribe : function(event, fn) {
  this.listeners.add(event, fn);
 },

 // 模拟socket.io client的事件接口
 on : function(event, fn) {
  this.subscribe(event, fn);
 },

 broadcast : function(event) {
  if (!this.listeners.list[event])
   return;
  var funcHolder = this.listeners.list[event];
  if (!funcHolder)
   return;

  funcHolder.apply(this, [].slice.call(arguments, 1));
 },

 unsubscribe : function(event) {
  this.listeners.remove(event);
 }
};