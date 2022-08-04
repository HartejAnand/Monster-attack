AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 3000)
        setInterval(this.shootEnemyBullet, 5000)
        setInterval(this.shootEnemyBullet, 7000)
        setInterval(this.shootEnemyBullet2, 5000)
        setInterval(this.shootEnemyBullet2, 3000)
        setInterval(this.shootEnemyBullet2, 7000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");
            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 2,
            });

            enemyBullet.setAttribute("material", "color", "rgb(255, 100, 0)");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var position1=new THREE.Vector3();
            var position2=new THREE.Vector3();

            //Get enemey and player position using Three.js methods
            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;
            
            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            //set the velocity and it's direction
            var direction = new THREE.Vector3();
            
            direction.subVectors(position1, position2).normalize();

            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));

            //Set dynamic-body attribute
            enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0",
            });

            //Get text attribute
            var element=document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value);

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Add the conditions here
                    if(playerLife>0){
                        playerLife-=1;
                        element.setAttribute("text", {
                            value: playerLife
                        });
                    }
                    if(playerLife<=0){
                        //show text
                        var txt = document.querySelector("#over");
                        txt.setAttribute("visible", true);
                        //remove tanks
                        var tankEl = document.querySelectorAll(".enemy");
                        for(var i=0; i<tankEl.length; i++){
                            scene.removeChild(tankEl[i]);
                        }
                    }
                }
            });
        }
    },



    shootEnemyBullet2: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");
            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 2,
            });

            enemyBullet.setAttribute("material", "color", "rgb(255, 100, 0)");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var position1=new THREE.Vector3();
            var position2=new THREE.Vector3();

            //Get enemey and player position using Three.js methods
            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;
            
            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            //set the velocity and it's direction
            var direction = new THREE.Vector3();
            
            direction.subVectors(position1, position2).normalize();

            enemyBullet.setAttribute("velocity", direction.multiplyScalar(-10));

            //Set dynamic-body attribute
            enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0",
            });

            //Get text attribute
            var element=document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value);

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Add the conditions here
                    if(playerLife>0){
                        playerLife-=1;
                        element.setAttribute("text", {
                            value: playerLife
                        });
                    }
                    if(playerLife<=0){
                        //show text
                        var txt = document.querySelector("#over");
                        txt.setAttribute("visible", true);
                        //remove tanks
                        var tankEl = document.querySelectorAll(".enemy");
                        for(var i=0; i<tankEl.length; i++){
                            scene.removeChild(tankEl[i]);
                        }
                    }
                }
            });
        }
    },
});