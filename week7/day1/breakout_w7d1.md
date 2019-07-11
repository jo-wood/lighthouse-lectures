# Breakout Notes w7d1

## Ruby

* make a game of robots that fight eachother
* automated game, no player input right now
* how should we think about setting up our classes?
  * game class
    * job is to create the players, start the game
  * robot class
    * current health
    * being attacked
    * how they can attack
* every class should have only one job and do that job well

* interfaces not implementations
  * want to tell the other robot to affect it's health versus us as the current robot being able to adjust that directly


* below is the build for just one round. See further below for scenerio when looping through for game condititons

```ruby
#robot.rb
# let hp rep health and ap rep attack ability

class Robot

  attr_reader :name

  MAX_HEALTH = 50

  def initialize name
    @name = name
    @hp = MAX_HEALTH
    @ap = 10
  end

  def attack other_robot
    # rand non-inclusive therefor add 1 so don't get 0
    # can't do other_robot.hp -= attack_damage (and don't want to with OOP)therefore:

    attack_damage = 1 + rand(@ap)
    other_robot.take_damage attack_damage
    attack_damage
  end

  def take_damage amount
    @hp -= amount
  end

  def summary
  "#{name}: #{hp}_HP"
  end

end


# game.rb
## this class is the only one allowed to puts per requirements

require './robot'

class Game

  def initialize
    @robots = [
      Robot.new("R2D2"),
      Robot.new("Calculon"),
      Robot.new("Bender"),
      Robot.new("Wall-E"),
      Robot.new("Baymax")
    ]
  end

  def run
    puts
    puts "=== Turn 1 ==="
    puts

    attacking_robot = @robots.first
    target_robot = @robots.filter { |r| r != attacking_robot }.sample
    puts "#{attacking_robot.name} is attacking #{target_robot.name} "

    damage = attacking_robot.attack target_robot
    puts "#{attacking_robot.name} does #{damage} damage! "

    puts
    puts "=== Summary ==="
    puts

    @robots.each do |r|
        puts r.summary
    end
  end

end




# main.rb
## good place to chomp input or ask "how many players you want" - but simple ex:

require './game'

game = Game.new

puts "Welcome to the Robot Fight!!!"

game.run

puts "Thanks for playing!"

```

* what condition would mean that our game is over?
* we will have last robot standing be the winner and signal that the game is over

```ruby

# turb.rb

class Turn

  attr_reader :attacker, :defender

  def initialize attacker, defender
    @attacker = attacker
    @defender = defender
  end
end

# turn_manager.rb

require './turn'

class TurnManager
  def initialize players
    #this makes a new copy of the array (and still contains same objects since everything in Ruby is an object)
    # the shuffle prevents first robot in array having first advantage
    @players = players.dup.shuffle
  end

  def gen_next_turn
    attacker = @players.first
    defender = @players.filter { |r| r != attacker and not r.dead? }.sample
    # each player gets a turn in sequence
    @players.rotate!
    Turn.new attacker, defender
  end

end



#robot.rb
# let hp rep health and ap rep attack ability

class Robot

  attr_reader :name

  MAX_HEALTH = 50

  def initialize name
    @name = name
    @hp = MAX_HEALTH
    @ap = 10
  end

  def attack other_robot
    # rand non-inclusive therefor add 1 so don't get 0
    # can't do other_robot.hp -= attack_damage (and don't want to with OOP)therefore:

    attack_damage = 1 + rand(@ap)
    other_robot.take_damage attack_damage
    attack_damage
  end

  def take_damage amount
    @hp -= amount
  end

  def dead?()
    @ap <= 0
  end

  def summary
  "#{name}: #{hp}_HP #{dead? ? 'dead' : ''}"
  end

end


# game.rb
## this class is the only one allowed to puts per requirements

require './robot'
require './turn_manager'

class Game

  def initialize
    @robots = [
      Robot.new("R2D2"),
      Robot.new("Calculon"),
      Robot.new("Bender"),
      Robot.new("Wall-E"),
      Robot.new("Baymax")
    ],
    @turn_manager = TurnManager.new @robots,
    @current_turn = 1
  end

  def run
    while (not game_over?) do
      puts
      puts "=== Turn #{@current_turn} ==="
      puts

      turn = @turn_manager.gen_next_turn

      if turn.attacker.dead? then
        puts "#{turn.attacker.name} is dead"
      else 
        attacking_robot = @robots.first
        target_robot = @robots.filter { |r| r != attacking_robot and not r.dead? }.sample
        puts "#{attacking_robot.name} is attacking #{target_robot.name} "

        damage = attacking_robot.attack target_robot
        puts "#{attacking_robot.name} does #{damage} damage! "
      end

      puts
      puts "=== Summary ==="
      puts

      @robots.each do |r|
          puts r.summary
      end

      # this command allows us to slow down the rendering of the sync execution
      sleep 0.5
      @current_turn += 1;
    end

    winning_robot = alive_robots
    puts "#{winning_robot} has won the robot fight! "
  end


  def game_over?
    alive_robots.count == 1
     #@robots.filter { |r| r.dead? }.count == 1
  end

  def alive_robots
    @robots.filter { |r| r.dead? }
  end

end




# main.rb
## good place to chomp input or ask "how many players you want" - but simple ex:

require './game'

game = Game.new

puts "Welcome to the Robot Fight!!!"

game.run

puts "Thanks for playing!"

```
