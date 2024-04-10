window.addEventListener("load", () => {
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 800;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;

    class Robot {
        constructor(canvas) {
            this.canvas = canvas;
            this.x = this.canvas.width * 0.5;
            this.y = this.canvas.height * 0.5;
            this.centerX = this.x;
            this.centerY = this.y;
            this.spriteWidth = 370;
            this.spriteHeight = 393;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.frameX = 0;
            this.maxFrame = 75;
            this.radius = 80;
            this.eye1Radius = this.radius * 0.4;
            this.eye2Radius = this.radius * 0.65;
            this.eye1Distance = this.eye1Radius;
            this.eye2Distance = this.eye2Radius;
            this.angle = 0;
            this.movementAngle = 0;
            this.bodyImg = bodyImage;
            this.bodySpriteImg = bodySpriteImage;
            this.eye1Img = eye1Image;
            this.eye2Img = eye2Image;
            this.reflectionImg = reflectionImage;
            this.detectorLightImg = detectorLightImage;
            this.tracking = false;
            this.mouse = {
                x: this.canvas.width * 0.5,
                y: this.canvas.height * 0.5,
            };
            this.canvas.addEventListener("mousemove", (e) => {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.tracking = true;
            });
            this.canvas.addEventListener("mouseleave", (e) => {
                this.tracking = false;
            });
        }
        draw(ctx) {
            ctx.drawImage(
                this.bodySpriteImg,
                this.frameX * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x - this.spriteWidth * 0.5 + 65,
                this.y - this.spriteHeight * 0.5 - 53,
                this.width,
                this.height
            );
            //eye1
            ctx.drawImage(
                this.eye1Img,
                this.x +
                    Math.cos(this.angle) * this.eye1Radius -
                    this.eye1Img.width * 0.5,
                this.y +
                    Math.sin(this.angle) * this.eye1Radius -
                    this.eye1Img.height * 0.5
            );
            //eye2
            ctx.drawImage(
                this.eye2Img,
                this.x +
                    Math.cos(this.angle) * this.eye2Radius -
                    this.eye2Img.width * 0.5,
                this.y +
                    Math.sin(this.angle) * this.eye2Radius -
                    this.eye2Img.height * 0.5
            );
            //reflection
            ctx.drawImage(
                this.reflectionImg,
                this.x - this.reflectionImg.width * 0.5,
                this.y - this.reflectionImg.height * 0.5
            );
            // tracking
            if (this.tracking) {
                ctx.drawImage(
                    this.detectorLightImg,
                    this.x - this.detectorLightImg.width * 0.5,
                    this.y - this.detectorLightImg.height * 0.5 - 200
                );
            }
        }
        update() {
            // rotation
            const dx = this.mouse.x - this.x;
            const dy = this.mouse.y - this.y;
            const distance = Math.hypot(dx, dy);
            // Eye look inside when distance less than radius
            if (distance <= this.eye1Distance * 2.5) {
                this.eye1Radius = distance * 0.4;
                this.eye2Radius = distance * 0.65;
            } else if (this.tracking) {
                this.eye1Radius = this.eye1Distance;
                this.eye2Radius = this.eye2Distance;
            } else {
                this.eye1Radius =
                    this.eye1Distance * Math.cos(this.movementAngle);
                this.eye2Radius =
                    this.eye2Distance * Math.cos(this.movementAngle);
            }
            this.angle = Math.atan2(dy, dx);
            // sprite animation
            this.frameX = this.frameX < this.maxFrame ? this.frameX + 1 : 0;
            //movement
            this.movementAngle += 0.01;
            this.x = this.centerX + Math.cos(this.movementAngle * 3) * 80;
            this.y = this.centerY + Math.sin(this.movementAngle * 0.5) * 150;
            if (this.movementAngle > Math.PI * 4) {
                this.movementAngle = 0;
            }
        }
    }

    const robot = new Robot(canvas);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        robot.update();
        robot.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});
