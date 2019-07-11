# w7d2 - Ruby OOP

## bundler

* similar in creating dependency matching for our project as package.json did
* but gems only need to be installed once, therefore bundle is grabbing those dependencies without needing to install each time a new project requires gems

* in terminal:
`gem install bundler`

* Gemfile
`#frozen_string_literal: true`

* Can point this to a specific github source (say in business that repor name might be private)
* Otherwise it is pointing to a repo that has the info on that gem
* pry acts like a debugger
`gem "pry"`
* if need to be using a specifc version of the gem use this syntax:
* *version specifers are within bundler docs*
`gem "pry", "~> 0.12.0"`

`gem "activerecord"`
`gem "pg"`

* rails itself is an conglomeration of gems

* within terminal
`bundle init`
`bundle`

* also add faker

* gems are supposed to be numbered:
  * first is the version number which says the public api change breaks previous functionality
  * next number is new features (not necessarily bugs) but extend
  * incremement number, fixing bugs

* can see in Gemfile.lock which versions were actually loaded in the bundle

* setup.rb :

```ruby
require 'active_record'

require './models/'
require 'byebug'
# which establishes the connection to the database
# accepts a hash as input where the :adapter key must be specified with the name of the db adapter (in lowercase) - see docs for more info

# note our user/pass/db will be different

# need this statement to see the sql log statements print out
ActiveRecord::Base.logger = ActiveSupport::Logger.new(STDOUT)

ActiveRecord::Base.establish_connection(
  adapter: 'postgresql',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'w7d2'
)

puts "Connected to the DB!"

```

* active record allows us a way to organzie our data and also how to query our data
  * methods that allow creating, deleting etc
* see music lib ERD

```ruby
# setup.rb continued:
# music lib example


# since we will run this more than once, force delete the table if exists first than create again

ActiveRecord::Schema.define do

  create_table :artists, force: true do |t|
      #col  #colName
    t.string :name, null: false
  end

end

```

* then run the setup.rb file in terminal and see process run
* create a new file called models

```ruby
# models folder
# artist.rb

class Artist < ActiveRecord::Base



end


```

*In Terminal*

* the byebug at the end:
* in terminal `Artist` and this would be the output:
`=> Artist(id: integer, name: string)`
`Artist.find 1`
* by default for find it takes the value as an id (only would have to do .where for name)
* in output will see the select statement that it's looking for

`Artist.new name: 'AC?DC'`
* output: `#<Artist:98398392749872 id: nil, name: "AC/DC">
`a - _`
* this created the instance in memory
* but it is not persisted
`a.name` will work
`a.persisted?` will return false
`a.save`
* and now when we try this again
`Artist.find 1`
* we will find this instance

Note: 
`a == _`
* will return true

`Artist.all`
`Artist.where(name: "AC/DC")`
`set this artist equal to a1`

`a.name = "Led Zeplin"`
`a1.changed?` would return true
`aw.save`

* timestamps gets generated for you, which allows migration information to be recorded
* this also keeps track of created_at timestamp and updated_at timestamp as well (even though at time of created_at the updated_at will be the same) - ActiveRecord will do this for us (therefore adding t.timestamps tells it to add these records)

* from github Faker::Music which will help generate random strings related to our topic

```ruby
# setup.rb continued:
require 'faker'# add

ActiveRecord::Schema.define do

  create_table :artists, force: true do |t|
      #col  #colName
    t.string :name, null: false
    t.timestamps
  end

  create_table :albums, force: true do |t|
    t.string :title, null: false
    t.integer :year, null:false # this null means the value can't be null
    # IMPORTANT - the reference needs to be singular!! not artists even though the table has a column called artists
    t.references :artist, null:false # foreign key (must have artist)

    t.timestamps

  end


end

10.times do
  Artist.create! name: Faker::Music.band
  # code will stop if there is an error
  # otherwise without bang the code would have returned false and our code would continue
end

```

* in a sql db, can wrap both statements in a creation statement (transaction)
* thats what the BEGIN and COMMIT is doing
* it will rollback if there were any issues as if nothing happened


* covention over configuration
* could override these conventions, but they work very well in making succinct and easy to read relations
* joins are created as so:

```ruby
# album.rb

class Album < ActiveRecord::Base

  belongs_to :artist

end


# artist.rb

class Album < ActiveRecord::Base

  has_many :albums

end

```

* back in terminal

`a = Artist.find 3`
* gives us the artist instance of "The Rolling Stones"

`a.albums`
* and empty array will result (since that wasn't actually created yet)

`a.albums.create title: 'Fourty Licks', year: 1965`
* and the attachement to which artist is implict from the a.albums

`a.albums`
* will return the album we created

`Album.create title: Faker::Music.album, year: 1974, artist: a`
* will read the value of the artist instance a, and give this artist to the album table under this new randomly generated album instance (even though its not factual right now)

* need to reload the memory:
`a.reload`

* and now:
`a.albums`
* will output both the albums we just created for this artist `a`
* the database as stored these in our tables

```ruby
# add within the Scheme block of setup.rb:

create_table :tags, force: true do |t|
  t.string :name, null: false

  t.timestamps
end

create_join_table :artists, :tags, force: true

```

* in case of Playlist Tracks we have the join but we also have meta data that we need where there is a column of play_count which says how many times a track within that playlist was played

* but our tags table does have any unique meta data, just a joining of 2 table keys

```ruby
# tag.rb

class Tag < ActiveRecord::Base
  # note that it is plural here!
  has_and_belongs_to_many :artists

end

# artist.rb

class Artist < ActiveRecord::Base
  has_many :albums
  has_and_belongs_to_many :tags
end


```

```ruby
#setup.rb adter  10.times end statement

# this is a row within the tags table
rock = Tag.create name: "Rock"
pop = Tag.create name: "Pop"

all_artists = Artists.all

# shovel random artists into these
rock.artists << all_artists.sample
rock.artists << all_artists.sample
rock.artists << all_artists.sample

pop.artists << all_artists.sample
pop.artists << all_artists.sample
pop.artists << all_artists.sample

```

* now in terminal
`rock.artists`
* will return who was inserted into this table
reverse way
`Artists.find(7).tags`
* and we will see the tag of rock

`Tag.where(name: "Rock").artists.first`?