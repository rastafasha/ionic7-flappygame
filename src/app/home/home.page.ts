import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { ComponentsModule } from './components/components.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ComponentsModule],
})
export class HomePage  implements OnInit{

  //variables
  container_height!: number;
  container_width!: number;

  gameStarted: boolean = false;
  gameOver: boolean = false;
  score: number = 0;

  musicActive: boolean = false;
  audio = new Audio('/assets/music/ionic-bird-track.MP3');

  bird_height: number = 38;
  bird_width: number = 43;
  bird_position: number = 300;


  obstacle_height: number = 0;
  obstacle_width: number = 52;
  obstacle_position: number = this.container_width;
  obstacle_gap: number = 200;

  //variables de intervalo
  bird_interval!: NodeJS.Timeout;
  obstacle_interval!: NodeJS.Timeout;

  constructor(
    private platform: Platform
  ) {}

  ngOnInit(): void {
    this.setContainerSize();
    this.bird_interval = setInterval(this.addGravity.bind(this),24);
    this.obstacle_interval = setInterval(this.moveObstacle.bind(this),24);
  }

  setContainerSize(){
    this.container_height = this.platform.height();
    this.container_width = this.platform.width() < 576 ? this.platform.width() : 576; //definimos el tamaño de la pantalla
  }

  // iniciar juego
  startGame(){
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
  }

  // agregar gravedad
  addGravity(){
    let gravity = 4.5;
    if(this.gameStarted) this.bird_position += gravity;
  }

  // saltar
  jump(){
    if(this.gameStarted){
      if(this.bird_position < this.bird_height) this.bird_position = 0;
      else this.bird_position -=60;
    }
  }
  // mover los obstaculos hacia adelante
  moveObstacle(){
    let speed: number = 6;
    if(this.container_width < 400) speed = 4; // velocidad para moviles
    if(this.gameStarted && this.obstacle_position >= -this.obstacle_width) this.obstacle_position -= speed;// hace que se mueva hacia adelante
      else{
        this.resetObstaclePosition();
        if(this.gameStarted) this.score++; //incrementa el puntaje en 1
      }
      this.checkColision();
  }

  // game over
  setGameOver(){
    this.gameStarted = false;
    this.gameOver = true;
    this.bird_position = 300;
  }

  // chequea si ocurre una colision
  checkColision(){
    //cuando el flapybird toca el techo
    let top_ostacule_collision = this.bird_position >= 0 && this.bird_position < this.obstacle_height;

    let bottom_ostacule_collission = this.bird_position >= this.container_height - (this.container_height - this.obstacle_gap - this.obstacle_height) - this.bird_height;

    //cuando el flapybird toca el suelo
    let flor_collission = (this.bird_position + 40 >= this.container_height);

    if(flor_collission) this.setGameOver()

    if(this.obstacle_position >= this.obstacle_width
      && this.obstacle_position <= this.obstacle_width + 80
      && (top_ostacule_collision || bottom_ostacule_collission )){
        this.setGameOver();
      }

  }

  // resetear la posicion del obstaculo
  resetObstaclePosition(){
    this.obstacle_position = this.container_width;
    this.obstacle_height = Math.floor(Math.random()* (this.container_height - this.obstacle_gap))
  }

  playMusic(){
    this.musicActive = !this.musicActive;
    if(this.musicActive){
      this.audio.play();
      this.audio.loop;
    }else this.audio.pause();
  }


}
