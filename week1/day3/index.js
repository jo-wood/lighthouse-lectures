var array = [1, 2, 3, 4, 5];

var instructor = {
  name: "Dave",
  role: "Head Instructor",
  numberOfStudents: 23,
  isActive: true,
  courses: {'web':'iOS'},
  profile: {
    email: "david.mills@lighthouse.ca"
  }
};

var name = instructor.name;
var numberOfStudents = instructor.numberOfStudents;

for (var key in instructor) {
  var value = instructor[key];
}

var keys = Object.keys(instructor);
console.log(keys);

for (var i = 0; i < keys.length; i++){
  var key = keys[i];
  if (instructor[key] === "Dave") {
    console.log(key);
  }
}

instructor.car = "Mini";
instructor['pets'] = ['Gabriel', 'Crookshanks'];
