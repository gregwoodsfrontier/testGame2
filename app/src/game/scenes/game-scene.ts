import {
  LEFT_CHEVRON, BG, CLICK, TILESET, DUNGEONMAP, TANKBLUE
} from 'game/assets';
import { AavegotchiGameObject } from 'types';
import { getGameWidth, getGameHeight, getRelative } from '../helpers';
import { Player } from 'game/objects';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

/**
 * Scene where gameplay takes place
 */
export class GameScene extends Phaser.Scene {
  private player?: Player;
  //private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private selectedGotchi?: AavegotchiGameObject;

  // Sounds
  private back?: Phaser.Sound.BaseSound;

  constructor() {
    super(sceneConfig);
  }

  init = (data: { selectedGotchi: AavegotchiGameObject }): void => {
    this.selectedGotchi = data.selectedGotchi;
  };

  public create(): void {
    //this.cursors = this.input.keyboard.createCursorKeys();

    // Add layout
    this.add.image(getGameWidth(this) / 2, getGameHeight(this) / 2, BG)
    .setDisplaySize(getGameWidth(this), getGameHeight(this))
    .setScrollFactor(0);
    this.back = this.sound.add(CLICK, { loop: false });

    const map = this.make.tilemap({ key: DUNGEONMAP });
    
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("sokoban", TILESET);

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer('belowPlayer', tileset, 0, 0);
    const sameLayer = map.createLayer("samePlayer", tileset, 0, 0);

    sameLayer.setCollisionByProperty({ collides: true });
    this.activateDebugGraphics(sameLayer);

    const tanksLayer = map.getObjectLayer('tanks')
    tanksLayer.objects.forEach(data => {
      console.log(data)
      if(!data.x || !data.y)
      {
        return console.error('tank x and y is undefined')
      }
      const tank = this.physics.add.image(data.x, data.y, TANKBLUE);
      tank.setRotation(data.rotation);
      
    })
    

    this.createBackButton();

    // Add a player sprite that can be moved around.
    this.player = new Player({
      scene: this,
      x: 750,
      y: 750,
      //x: getGameWidth(this) / 2,
      //y: getGameHeight(this) / 2,
      key: this.selectedGotchi?.spritesheetKey || ''
    });


    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;
    camera.startFollow(this.player.sprite);

    this.physics.add.collider(this.player.sprite, sameLayer);
  }

  private activateDebugGraphics(tilelayer: Phaser.Tilemaps.TilemapLayer)
  {
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    tilelayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  }

  private createBackButton = () => {
    this.add
      .image(getRelative(54, this), getRelative(54, this), LEFT_CHEVRON)
      .setScrollFactor(0)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .setDisplaySize(getRelative(94, this), getRelative(94, this))
      .on('pointerdown', () => {
        this.back?.play();
        window.history.back();
      });

  };

  public update(): void {
    // Every frame, we update the player
    this.player?.update();
  }
}
