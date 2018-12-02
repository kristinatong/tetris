# Tetris
> A modern twist to the classic game, Tetris, built on Javascript and HTML5.

<p align="center">
  <img width="850" height="522" src="https://github.com/kristinatong/tetris/blob/master/demos/tetris4.gif"><br>
  <a href="https://vimeo.com/303965386"><b>Demo Video</b></a>
</p>

## Installation

OS X & Linux:

* Backend:

  ```sh
  bundle install
  ```

## Development setup

* Backend: 
  
  The Tetris API is built using postgreSQL. Please install postgreSQL on your computer before attempting to load the API on your local server.

  ```sh
  rails db:create
  rails db:migrate
  rails s
  ```
* Frontend:

  ```sh
  open index.html
  ```

## Release History

* 0.1.0
    * First official release

## Meta

Arielle Ramirez

[https://github.com/arielleramirez](https://github.com/arielleramirez)

Kristina Tong - kristina.tong@gmail.com

[https://github.com/kristinatong](https://github.com/kristinatong)


## Contributing

1. Fork it (<https://github.com/kristinatong/tetris/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
