var klass = require('./klass');
klass.add('Yan',['a','b']);
exports.add = function(klasses){
	klasses.forEach(function(item, index) {
		var _klass = item;
		var teacher = _klass.teacherName;
		var students = _klass.students;
		klass.add(teacher, students);
	})
}