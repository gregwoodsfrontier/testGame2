import Phaser from "phaser";
import {
    Buttons, Label
} from 'phaser3-rex-plugins/templates/ui/ui-components'
import Moralis from "moralis";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { getGameHeight, getGameWidth } from "game/helpers";


const COLOR_LIGHT = 0x7b5e57;

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Title',
};


const launch = () => {
    const user = Moralis.User.current();
    if (!user) {
      console.log("PLEASE LOG IN WITH METAMASK!!")
    }
    else{
      console.log(user.get("ethAddress") + " " + "logged in")
    }

}

async function login() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.Web3.authenticate();
        launch();
    }
    console.log("logged in user:", user);
    console.log('login as user');
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
    location.reload();
}



export class TitleScene extends Phaser.Scene
{
    rexUI!: RexUIPlugin;

    constructor()
    {
        super(sceneConfig);
    }

    public create() :void
    {
        const buttons = this.rexUI.add.buttons({
            x: getGameWidth(this)/2,
            y: getGameHeight(this)/2,
            width: 100,
            height: 100,
            orientation: 'y',
            space: {
                item: 8
            },
            buttons: [
                this.createButton(this, 'LOGIN'),
                this.createButton(this, 'LOGOUT')
            ]
        }).layout();

        this.add.existing(buttons);

        buttons.on('button.click', (button: Label, index: number) => {
            if(button.text === 'LOGIN')
            {
                login();
            }

            if(button.text === 'LOGOUT')
            {
                logOut();
            }
        })


        /* buttons.on('button.click', (button, index, pointer) => {
            if(buttons.text === 'LOGIN') {
                login();
                return
            }

            if(buttons.text === 'LOGOUT') {
                logOut();
                return
            }
        }) */
    }

    createButton = (scene: Phaser.Scene, text: string) => {
        return this.rexUI.add.label({
            width: 200,
            height: 100,
            background: this.rexUI.add.roundRectangle(400, 300, 100, 100, 10, COLOR_LIGHT),
            text: scene.add.text(400, 300, text, {
                fontSize: '18px'
            }),
            space: {
                left: 10,
                right: 10,
            },
            align: 'center'
        })
    }

    /* public update() :void
    {

    }; */
}
