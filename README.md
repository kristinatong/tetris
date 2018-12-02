# Tetris
> A modern twist to the classic game, Tetris, built on Javascript and HTML5.

<p align="center">
  <img width="850" height="522" src="https://github.com/kristinatong/tetris/blob/master/demos/tetris4.gif"><br>
  <a href="https://vimeo.com/303965386"><b>Demo Video</b></a>
</p>

## Getting Started

### Prerequisites

You'll need to install:

* PostgreSQL

### Installation

OS X & Linux:

* /backend:

  ```sh
  bundle install
  ```

### Development setup

* /backend: 
  
  The Tetris API is built using postgreSQL. Please install postgreSQL on your computer before attempting to load the API on your local server.

  ```sh
  rails db:create
  rails db:migrate
  rails s
  ```
* /frontend:

  ```sh
  open index.html
  ```

## Built With

* [Ruby on Rails](https://rubyonrails.org/) - Server-side web application framework
* [PostgreSQL](https://www.postgresql.org/) - Database for Active Record
* Front-end written in vanilla Javascript, HTML5 and CSS for styling.

## Contributing

1. Fork it (<https://github.com/kristinatong/tetris/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Versioning

* 0.1.0
    * First official release

## Authors

* **Arielle Ramirez** - [arielleramirez](https://github.com/arielleramirez)
* **Kristina Tong** - [kristinatong](https://github.com/kristinatong)

See also the list of [contributors](https://github.com/kristinatong/tetris/contributors) who participated in this project.
