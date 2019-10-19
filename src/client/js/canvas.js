var global = require('./lib/global');

class Canvas {
    constructor(params) {
        this.directionLock = false;
        this.target = global.target;
        this.reenviar = true;
        this.socket = global.socket;
        this.directions = [];
        var self = this;

        this.cv = document.getElementById('gameCanvas');
        this.cv.width = global.screenWidth;
        this.cv.height = global.screenHeight;
        this.cv.addEventListener('mousemove', this.gameInput, false);
        this.cv.addEventListener('keydown', this.keyboardDown, false);
        this.cv.addEventListener('keyup', this.keyboardUp, false);
        this.cv.addEventListener("mousedown", this.mouseDown, false);
        this.cv.addEventListener("mouseup", this.mouseUp, false);
        this.cv.parent = self;
        global.canvas = this;
    } 
    
    keyboardDown(event) {
        switch (event.keyCode) {
        case 13: if (global.died) this.parent.socket.talk('s', global.playerName, 0); global.died = false; break; // Enter to respawn

        // ======================================================================
        // Chat system.
        // ======================================================================
        // H
        case 72:
            if (!global.died) {
                if (global.isChatMode === false) {
                    // Chat input textbox.
                    let chatInput = document.createElement('input');
                    chatInput.id = 'chatInput';
                    chatInput.tabindex = 4;
                    chatInput.style.font = 'bold 18px Ubuntu';
                    chatInput.maxlength = '200';
                    chatInput.placeholder = 'Enter to send.Esc to cancel.Введите,чтобы отправить.Esc,чтобы отменить.';

                    // =============================================
                    // Players list drop down list.
                    // =============================================
                    let playersDropDownList = document.createElement("select");
                    playersDropDownList.id = "playersList";
                    playersDropDownList.className = 'players-list';

                    // Add default option.
                    let allOption = document.createElement("option");
                    allOption.value = '0';
                    allOption.text = '-- All --';
                    playersDropDownList.appendChild(allOption);

                    try {
                        const players = global.playersList;

                        //Create and append the options
                        for (var i = 0; i < players.length; i+=2) {
                            var option = document.createElement("option");
                            option.value = players[i];
                            option.text = players[i+1];
                            playersDropDownList.appendChild(option);
                        }

                        // Try to set the value to previously selected player id.
                        playersDropDownList.value = global.selectedPlayerId;

                        // Player does not exist anymore?
                        if (playersDropDownList.value != global.selectedPlayerId){
                            // Change to default index.
                            playersDropDownList.selectedIndex = 0;
                        }
                    }
                    catch (error){
                        console.log(error);
                    }

                    // =============================================
                    // Chat input wrapper div.
                    let chatInputWrapper = document.createElement('div');
                    chatInputWrapper.style.position = 'absolute';
                    chatInputWrapper.style.width = '720px';

                    chatInputWrapper.style.left = '50%';
                    chatInputWrapper.style.bottom = '100px';
                    chatInputWrapper.style.transform = 'translate(-50%, -50%)';
                    chatInputWrapper.style.margin = '0 auto';
                    chatInputWrapper.style.visibility = 'hidden';

                    chatInputWrapper.appendChild(playersDropDownList);
                    chatInputWrapper.appendChild(chatInput);
                    document.body.appendChild(chatInputWrapper);

                    // Sending chat.
                    chatInput.addEventListener('keydown', function(event) {
                        if (event.key === 'Enter' || event.keyCode === 13) {
                            // ========================================================================
                            // Check again if the player died, otherwise, it hangs the client.
                            // There will be an error saying that "color is undefined" in app.js file.
                            // ========================================================================
                            // Death chat experiment.
                            if (global.died) {
                                global.socket.talk('s', global.playerName, 0);
                                global.died = false;
                            }
                            else {
                                let chatMessage = chatInput.value;

                                if (chatMessage) {
                                    let maxLen = 100;
                                    let trimmedMessage = chatMessage.length > maxLen ? chatMessage.substring(0, maxLen - 3) + "..." : chatMessage.substring(0, maxLen);

                                    const ddl = playersDropDownList;
                                    if (ddl){
                                        global.playersListIndex = ddl.selectedIndex;
                                        global.selectedPlayerId = ddl.options[ddl.selectedIndex].value;
                                    }

                                    global.socket.talk('h', trimmedMessage, global.selectedPlayerId);

                                    chatInputWrapper.removeChild(playersDropDownList);
                                    chatInputWrapper.removeChild(chatInput);
                                    document.body.removeChild(chatInputWrapper);

                                    let gameCanvas = document.getElementById('gameCanvas');
                                    gameCanvas.focus();

                                    global.isChatMode = false;
                                }
                            }
                        }
                    });

                    // Cancelling chat - pressing ESC in players dropdown list.
                    playersDropDownList.addEventListener('keydown', function(event) {
                        if (event.key === 'Esc' || event.keyCode === 27) {
                            chatInputWrapper.removeChild(playersDropDownList);
                            chatInputWrapper.removeChild(chatInput);
                            document.body.removeChild(chatInputWrapper);

                            const gameCanvas = document.getElementById('gameCanvas');
                            gameCanvas.focus();
                            global.isChatMode = false;
                        }
                    });

                    // Cancelling chat.
                    chatInput.addEventListener('keydown', function(event) {
                        if (event.key === 'Esc' || event.keyCode === 27) {
                            chatInputWrapper.removeChild(playersDropDownList);
                            chatInputWrapper.removeChild(chatInput);
                            document.body.removeChild(chatInputWrapper);

                            const gameCanvas = document.getElementById('gameCanvas');
                            gameCanvas.focus();
                            global.isChatMode = false;
                        }
                    });

                    global.isChatMode = true;

                    // To remove initial "i" letter.
                    setTimeout(() => {
                        chatInput.value = '';
                        chatInputWrapper.style.visibility = 'visible';
                        chatInput.focus();
                    }, 10);
                }
                else {   // Already in chat mode, focus the chat input textbox.
                    let existingChatInput = document.getElementById('chatInput');
                    if (existingChatInput) {
                        // Remove 'h' from the input.
                        let oldValue = existingChatInput.value;
                        existingChatInput.value = '';
                        existingChatInput.focus();
                        existingChatInput.value = oldValue;
                    }
                }
            }
            break;
        // ===========================================

        case global.KEY_UP_ARROW:
        case global.KEY_UP:     this.parent.socket.cmd.set(0, true); break;
        case global.KEY_DOWN_ARROW:
        case global.KEY_DOWN:   this.parent.socket.cmd.set(1, true); break;
        case global.KEY_LEFT_ARROW:
        case global.KEY_LEFT:   this.parent.socket.cmd.set(2, true); break;
        case global.KEY_RIGHT_ARROW:
        case global.KEY_RIGHT:  this.parent.socket.cmd.set(3, true); break;
        case global.KEY_MOUSE_0: this.parent.socket.cmd.set(4, true); break;
        case global.KEY_MOUSE_1: this.parent.socket.cmd.set(5, true); break;
        case global.KEY_MOUSE_2: this.parent.socket.cmd.set(6, true); break;
        case global.KEY_LEVEL_UP: this.parent.socket.talk('L'); break;
        case global.KEY_FUCK_YOU: this.parent.socket.talk('0'); break;
        }
        if (!event.repeat) {
            switch (event.keyCode) {
            case global.KEY_AUTO_SPIN:    this.parent.socket.talk('t', 0); break;
            case global.KEY_AUTO_FIRE:    this.parent.socket.talk('t', 1); break;
            case global.KEY_OVER_RIDE:    this.parent.socket.talk('t', 2); break;
            }
            if (global.canSkill) {
                switch (event.keyCode) {
                case global.KEY_UPGRADE_ATK:  this.parent.socket.talk('x', 0); break;
                case global.KEY_UPGRADE_HTL:  this.parent.socket.talk('x', 1); break;
                case global.KEY_UPGRADE_SPD:  this.parent.socket.talk('x', 2); break;
                case global.KEY_UPGRADE_STR:  this.parent.socket.talk('x', 3); break;
                case global.KEY_UPGRADE_PEN:  this.parent.socket.talk('x', 4); break;
                case global.KEY_UPGRADE_DAM:  this.parent.socket.talk('x', 5); break;
                case global.KEY_UPGRADE_RLD:  this.parent.socket.talk('x', 6); break;
                case global.KEY_UPGRADE_MOB:  this.parent.socket.talk('x', 7); break;
                case global.KEY_UPGRADE_RGN:  this.parent.socket.talk('x', 8); break;
                case global.KEY_UPGRADE_SHI:  this.parent.socket.talk('x', 9); break;
                }
            }
            // if (global.canUpgrade) {
            //     switch (event.keyCode) {
            //     case global.KEY_CHOOSE_1:  this.parent.socket.talk('U', 0); break;
            //     case global.KEY_CHOOSE_2:  this.parent.socket.talk('U', 1); break;
            //     case global.KEY_CHOOSE_3:  this.parent.socket.talk('U', 2); break;
            //     case global.KEY_CHOOSE_4:  this.parent.socket.talk('U', 3); break;
            //     case global.KEY_CHOOSE_5:  this.parent.socket.talk('U', 4); break;
            //     case global.KEY_CHOOSE_6:  this.parent.socket.talk('U', 5); break;
            //     case global.KEY_CHOOSE_7:  this.parent.socket.talk('U', 6); break;
            //     case global.KEY_CHOOSE_8:  this.parent.socket.talk('U', 7); break;
            //     }
            // }
        }
    }    
    keyboardUp(event) {
        switch (event.keyCode) {
        case global.KEY_UP_ARROW:
        case global.KEY_UP:     this.parent.socket.cmd.set(0, false); break;
        case global.KEY_DOWN_ARROW:
        case global.KEY_DOWN:   this.parent.socket.cmd.set(1, false); break;
        case global.KEY_LEFT_ARROW:
        case global.KEY_LEFT:   this.parent.socket.cmd.set(2, false); break;
        case global.KEY_RIGHT_ARROW:
        case global.KEY_RIGHT:  this.parent.socket.cmd.set(3, false); break;
        case global.KEY_MOUSE_0: this.parent.socket.cmd.set(4, false); break;
        case global.KEY_MOUSE_1: this.parent.socket.cmd.set(5, false); break;
        case global.KEY_MOUSE_2: this.parent.socket.cmd.set(6, false); break;
        }
    }         
    mouseDown(mouse) {
        switch (mouse.button) {
        case 0: 
            let mpos = { x: mouse.clientX, y: mouse.clientY, };
            let statIndex = global.clickables.stat.check(mpos);
            if (statIndex !== -1) this.parent.socket.talk('x', statIndex);
            else if (global.clickables.skipUpgrades.check(mpos) !== -1) global.clearUpgrades();
            else { 
                let upgradeIndex = global.clickables.upgrade.check(mpos);
                if (upgradeIndex !== -1) this.parent.socket.talk('U', upgradeIndex);
                else this.parent.socket.cmd.set(4, true); 
            }
        break;
        case 1: this.parent.socket.cmd.set(5, true); break;
        case 2: this.parent.socket.cmd.set(6, true); break;
        }
    }
    mouseUp(mouse) {
        switch (mouse.button) {
        case 0: this.parent.socket.cmd.set(4, false); break;
        case 1: this.parent.socket.cmd.set(5, false); break;
        case 2: this.parent.socket.cmd.set(6, false); break;
        }
    }    
    // Mouse location (we send target information in the heartbeat)
    gameInput(mouse) {
        this.parent.target.x = mouse.clientX - this.width / 2;
        this.parent.target.y = mouse.clientY - this.height / 2;
        global.target = this.parent.target;
        global.statHover = global.clickables.hover.check({ x: mouse.clientX, y: mouse.clientY, }) === 0;
    }
        
}

module.exports = Canvas;
