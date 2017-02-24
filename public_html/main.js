//Entity Area


var mapArray = [[2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 1, 0, 0, 0, 0, 0, 0, 8, 13, 8, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 8, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 8, 0, 0, 0, 0, 8, 0, 0, 1, 1, 1, 0, 8, 0, 8, 0, 8, 0, 8, 1, 1],
                [1, 0, 8, 0, 8, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 8, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0, 0, 1, 1, 1, 9, 9, 9, 9, 9, 9, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 7, 6, 6, 6, 4, 6, 6, 6, 7, 1],
                [1, 1, 1, 1, 4, 4, 1, 1, 11, 5, 5, 5, 5, 5, 5, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 11, 5, 5, 5, 5, 5, 5, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                ];

                var mapArray2 = [[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                                [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
                                [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 1, 0, 0, 1, 1, 9, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                                [1, 1, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 8, 1, 11, 5, 10, 1, 0, 8, 0, 8, 0, 8, 0, 8, 1, 1],
                                [1, 0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 8, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 1, 1, 4, 4, 1, 1, 4, 4, 9, 9, 1, 1, 9, 9, 1, 1, 1, 4, 7, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 10],
                                [1, 1, 1, 1, 1, 1, 1, 1, 11, 5, 5, 5, 5, 5, 5, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 5, 5, 5, 5, 10]
                                ];

                                var mapArray3 = [[2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                                [0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                                [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                                [0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 5, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                                [1, 1, 1, 1, 1, 1, 1, 1, 11, 5, 5, 5, 5, 5, 5, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 5, 5, 5, 5, 10]
                                                ];


var AM = new AssetManager();

AM.queueDownload("./img/horz_walk_left.png");
AM.queueDownload("./img/horz_walk_right.png");
AM.queueDownload("./img/right_jump.png");
AM.queueDownload("./img/left_jump.png");
AM.queueDownload("./img/background_tile.png");
AM.queueDownload("./img/lava.png");
AM.queueDownload("./img/stonebackground.png");
AM.queueDownload("./img/skeleton_spike2.png");
AM.queueDownload("./img/SpikeWithSkull2.png");
AM.queueDownload("./img/Empty_Spike2.png");
AM.queueDownload("./img/torch.png");
AM.queueDownload("./img/surface_lava.png");
AM.queueDownload("./img/shot.png");
AM.queueDownload("./img/right_forward_fall.png");
AM.queueDownload("./img/right_forward_facing_fall_death.png");
AM.queueDownload("./img/forward_facing_spike_death.png");
AM.queueDownload("./img/left_forward_facing_spike_death.png");
AM.queueDownload("./img/leftlavaSide.png");
AM.queueDownload("./img/lavarightside.png");
AM.queueDownload("./img/BrokenTile.png");
AM.queueDownload("./img/right_swing.png");
AM.queueDownload("./img/left_swing.png");
AM.queueDownload("./img/left_stand.png");
AM.queueDownload("./img/right_stand.png");
AM.queueDownload("./img/left_fall_forward.png");
AM.queueDownload("./img/left_fall_forward_death.png");
AM.queueDownload("./img/title.png");
AM.queueDownload("./img/right_dismount.png");
AM.queueDownload("./img/left_dismount.png");
AM.queueDownload("./img/target.png");
AM.queueDownload("./img/left_facing_open_chest.png");
AM.queueDownload("./img/chest_open_rightside.png");
AM.queueDownload("./img/door.png");









AM.downloadAll(function () {

    var canvas = document.getElementById("GameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();


    gameEngine.ctx = ctx;

    //******************************************************************//
    //                          Title Screen                            //
    //******************************************************************//
    var bg = new Background(gameEngine, "./img/title.png", 1200, 800);
    var startbtn = new StartButton(280, 568, gameEngine);
    var target = new Target(gameEngine);
    var title_scene_elements = [bg, startbtn, target];
    var title = new Scene(title_scene_elements, gameEngine, 0);


    //******************************************************************//
    //                          Level 1 - part 1                        //
    //******************************************************************//
    var bg = new Background(gameEngine, "./img/stonebackground.png", 1210, 800);
    var map = new Map(gameEngine, mapArray);
    var hero = new Hero(gameEngine, 100, 0);
    var hookshot = new Hookshot(gameEngine, hero);
    var target1 = new Target(gameEngine);
    var scene_two_elements = [bg, map, hero, hookshot, target1];
    var Scene2 = new Scene(scene_two_elements, gameEngine, 1);



    //******************************************************************//
    //                          Level 1 - part 2                        //
    //******************************************************************//
    var bg2 = new Background(gameEngine, "./img/stonebackground.png", 1210, 800);
    var map2 = new Map(gameEngine, mapArray2);
    var hero2 = new Hero(gameEngine, 1, 300);
    var hookshot2 = new Hookshot(gameEngine, hero2);
    var target2 = new Target(gameEngine);
    var scene_three_elements = [bg2, map2, hero2, hookshot2, target2];
    var Scene3 = new Scene(scene_three_elements, gameEngine, 2);





    //******************************************************************//
    //                         Load Scenes                              //
    //******************************************************************//


    //Set Scenes
    var gameScenes = [title, Scene2, Scene3];
    gameEngine.scenes = gameScenes;
    gameEngine.init(ctx);
    title.init();
    //Scence3.init();







    gameEngine.start();

});
