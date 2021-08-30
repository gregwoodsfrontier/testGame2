interface Props {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  frame?: number;
}

export class Player {
  private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys;
  public speed = 200;
  public sprite: Phaser.GameObjects.Sprite
  public scene: Phaser.Scene

  constructor({ scene, x, y, key }: Props) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, key);

    // sprite
    this.sprite.setOrigin(0, 0).setScale(0.8);

    // Add animations
    this.sprite.anims.create({
      key: 'idle',
      frames: this.sprite.anims.generateFrameNumbers(key || '', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });

    // physics
    //this.scene.physics.world.enable(this.sprite);

    // input
    this.cursorKeys = scene.input.keyboard.createCursorKeys();

    this.scene.add.existing(this.sprite);
    const body = this.sprite.body as Phaser.Physics.Arcade.Body
    body.setSize(this.sprite.displayWidth*0.7, this.sprite.displayHeight*0.8);
    /* const controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: camera,
      left: this.cursorKeys.left,
      right: this.cursorKeys.right,
      up: this.cursorKeys.up,
      down: this.cursorKeys.down,
      speed: 0.5
    }); */
  }

  update(): void {
    // Every frame, we create a new velocity for the sprite based on what keys the player is holding down.
    const velocity = new Phaser.Math.Vector2(0, 0);
    // Horizontal movement
    switch (true) {
      case this.cursorKeys?.left.isDown:
        velocity.x -= 1;
        this.sprite.anims.play('idle', false);
        break;
      case this.cursorKeys?.right.isDown:
        velocity.x += 1;
        this.sprite.anims.play('idle', false);
        break;
      default:
        this.sprite.anims.play('idle', true);
    }

    // Vertical movement
    switch (true) {
      case this.cursorKeys?.down.isDown:
        velocity.y += 1;
        this.sprite.anims.play('idle', false);
        break;
      case this.cursorKeys?.up.isDown:
        velocity.y -= 1;
        this.sprite.anims.play('idle', false);
        break;
      default:
        this.sprite.anims.play('idle', true);
    }

    // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    const normalizedVelocity = velocity.normalize();
    //this.sprite.body = new Phaser.Physics.Arcade.Body(this.scene.physics.world, this.sprite);
    //this.sprite.body.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
    (this.sprite.body as Phaser.Physics.Arcade.Body).setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  }
}
