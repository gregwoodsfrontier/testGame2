export interface Asset {
  key: string;
  src: string;
  type: 'IMAGE' | 'SVG' | 'SPRITESHEET' | 'AUDIO' | 'TILEMAPJSON';
  data?: {
    frameWidth?: number;
    frameHeight?: number;
  };
}

export interface SpritesheetAsset extends Asset {
  type: 'SPRITESHEET';
  data: {
    frameWidth: number;
    frameHeight: number;
  };
}

export const BG = 'bg';
export const FULLSCREEN = 'fullscreen';
export const LEFT_CHEVRON = 'left_chevron';
export const CLICK = 'click';
export const DUNGEONMAP = 'dungeonmap';
export const TILESET = 'tileset';
export const TANKBLUE = 'tankblue';
export const TANKGREEN = 'tankgreen';
export const TANKRED = 'tankred';
export const TANKSAND = 'tanksand';

// Save all in game assets in the public folder
export const assets: Array<Asset | SpritesheetAsset> = [
  {
    key: TANKSAND,
    src: 'assets/images/tankBody_sand.png',
    type: 'IMAGE',
  },
  {
    key: TANKBLUE,
    src: 'assets/images/tankBody_blue.png',
    type: 'IMAGE',
  },
  {
    key: TANKGREEN,
    src: 'assets/images/tankBody_green.png',
    type: 'IMAGE',
  },
  {
    key: TANKRED,
    src: 'assets/images/tankBody_red.png',
    type: 'IMAGE',
  },
  {
    key: TILESET,
    src: 'assets/tilesets/sokoban_tilesheet.png',
    type: 'IMAGE',
  },
  {
    key: DUNGEONMAP,
    src: 'assets/tilemaps/map.json',
    type: 'TILEMAPJSON',
  },
  {
    key: BG,
    src: 'assets/images/bg.png',
    type: 'IMAGE',
  },
  {
    key: LEFT_CHEVRON,
    src: 'assets/icons/chevron_left.svg',
    type: 'SVG',
  },
  {
    key: CLICK,
    src: 'assets/sounds/click.mp3',
    type: 'AUDIO',
  },
];
