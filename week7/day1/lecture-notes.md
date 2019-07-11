# W7D1 - Ruby

```ruby
myDictionary = {
  name: "David",
  role: "Instructor"
}

pp myDictionary[:name]
```

* in terminal:
  * `"David".__id__`
  * Ruby instantiates the String object
  * Would get a diff number every time enter this command
  * `:name.__id__`
  * Will get the same id # every time entered in the terminal
  * Ruby instantiated a new instance

```ruby
class Person

  def initialize(name)
    @name = name
    #self.name = name (@name = name is the one like this.name = name in JS)
    #this won't work since its instantiating a method that wasn't defined
  end

end
```

* in JS we could console.log (Dave.name) because that variable was available publicly - always
* that instance variable can not be accessed outside of the class
* therefor need a method that returns the name instance variable 

```ruby
class Person

  def initialize(name)
    @name = name
  end

  def sayHi
    "Hello #{@name}!"
  end

end

david = Person.new("David")
puts david.name
# should keep puts outside of methods to keep pure and eliminate side effects where can

```

* 2 ways to give access to the instance variables
  1. generally call the methods by the inst. var. trying to read


```ruby
class Person

  def initialize(name)
    @name = name
  end

  def sayHi
    "Hello #{@name}!"
  end
  # this method is called a getter - or accessor
  def name
    @name
  end
  # this method is the setter
  def name=(newName)
    @name = newName
  end

end

david = Person.new("David")
puts david
puts david.name

```

* this way of writing methods for setter and getters can become cumbersome when multiple variables

```ruby
class Person

  def initialize(name)
    @name = name
  end

  def sayHi
    "Hello #{@name}!"
  end

  # if want both:
  attr_accessor :name

  # attr_read :name

  # attr_writer :name

end

david = Person.new("David")
puts david
puts david.name

```

* in terminal in irb - if create a new person `j = Person.new("Juan")`
* we will get false on `j == Person.new("Juan")
* because Ruby is comparing the instance of the variable - may have all same data but not the same
* if compared to something even of a different name, it would work!

```ruby
class Person

  def initialize(name)
    @name = name
  end

  def name=(new_name)
    @name = new_name
  end

  def == (other_person)
  ## this dbl equals overrides the Object class's default behaviour
    @name == other_person.name
  end

end

david = Person.new("David")
puts david
puts david.name

```

* now again, `j = Person.new('Juan')`
* `j == j` still true
* `j == Person.new('Juan')
* will return true

```Ruby

class Shape
  attr_reader :number_of_sides
  # make reader only bc once say how many sides don't really want that changing...

  def initialize number_of_sides
    @number_of_sides = number_of_sides
  end
end


class Circle < Shape

  attr_reader :radius

  def initialize radius
    super 1
    @radius = radius
  end

end

```

* in terminal irb
* `require './shape'`
* `Shape`
* `Circle`

* `Shape.new 10`
* above creates a new instance
* `Circle.new 5`


```Ruby

class Shape
  attr_reader :number_of_sides
  # make reader only bc once say how many sides don't really want that changing...

  def initialize number_of_sides
    @number_of_sides = number_of_sides
  end
end


class Circle < Shape

  attr_reader :radius
  
  # reaching in module of Math and grabbing specifc value (same as namespacing)
  PI = Math::PI

  def initialize radius
    super 1
    @radius = radius
  end

  def diameter
    2 * @radius
  end

  def circumference
    diameter * PI
  end

  def area
    diameter * PI ** 2
  end

end

```

* back in irb
* `require './shape'`
* `c = Circle.new 5`
* `c.circumference`

* when calling a method within (ie when we called diameter)
* Ruby will first check it's own instance methods first

```ruby
# cont.

class Rectangle < Shape

  def initialize length, width
    super 4
    @length = length
    @width = width
  end

  def perimeter
    2 * @length + 2 * @width
  end

  def area
    @width * @length
  end

end


class Square < Rectangle
  def initialize length
    # Rectangle requires 2 values as input
    super length, length
  end
end

```

* now in terminal `irb`
* `Reactangle.new 42, 53`
* `r = _` NOTE this makes equal to whatever the last return was in console (the object was following the =>)
* `r.perimeter` will return 190
* `r.area`  will return 2226

* no such thing as multiple inheritance in Ruby (other languages can)
* but can have multiple modules

## Iterations and Loops

```ruby

(1..10).class #=> range
# this block will recieve a parameter of i
# adding a callback method on the each iteration through the block
(1..10).each { |i| puts i }

# NOTE (1...10) is NON inclusive of the upper range value (would go from 1 to 9) 

# do.. end is the equivlent of { and } for multiple line loops
```

* need to write objects and classes for the interfaces, not the implmentation
* what if want to change the way the shapes are stored? this would affect how others are grabbing this information
* therefore we want our methods on this class to explain what data will DO versus what or how it is doing so (OOP cornerstone)
* ( wouldn't want to say 'addShapeToArray')

```ruby
require './shape'

class Main

  def initialize
    @shapes = []
  end

  def add_shape(shape)
   # if shape.is_a? Shape then
      @shapes << shape
    #end
  end

  def remove_shape(shape)
    #(! this will modify the underlying array, whereas without will return a new array)
    # keep all shapes that are not the shape we want to remove
    @shapes.filter! { |s| s != shape}
  end

end


# instantiate our Main case

main = Main.new

circle = Circle.new 10
rect = Rectangle.new 42 53
square = Square.new 95

main.add_shape circle
main.add_shape rect
main.add_shape square
# print our the instance main of our Main class:
puts main

main.remove_shape square
puts main

```

* what do now that we want to iterate through each shape and do something with that
* could expose the array, but what if we want to change how we store that array later

* therefore create a method


```ruby
require './shape'

class Main

  def initialize
    @shapes = []
  end

  def add_shape(shape)
    @shapes << shape
  end

  def remove_shape(shape)
    @shapes.filter! { |s| s != shape}
  end

  def each_shape
    # can also write as if !block_given?
    if not block_given? then
      return
    end

    @shapes.each do |shape|
      yield shape
      # any variables that we want to pass to that block
      # and again don't want to expose
    end
  end

end


pp main 
# cont..

# we are encapsulating the iteration of how we are going through each shape of the shapes array
# can't call main.each because main is not iterable data
# and we want to iterate through the data of shapes, specifically within this main class

# if i change the way shapes are stored (no longer an array) - i jsut have to fix
# how the methods within this class use it - rather than worry about how the outside is iteracting with this internal logic


# main.each_shape do |shape|
#   puts shape.area
# end

# what if we want the perimeter of each shape? 
main.each_shape do |shape|
  if shape.is_a? Circle then
    puts shape.circumference
  else
    puts shape.perimeter
  end 
end


```