class DrawableObject {
    x;
    y;
    img;
    height
    width
    imageCache = {};
    currentImage = 0;

    /**
     * This function creates a new image and sets the src of it
     * 
     * @param {string} path - This is the path of the image to be loaded
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

/**
 * This function creates images out of an array, sets their src
 * 
 * @param {string} arr - Name of the Array of the Img to be loaded
 */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * This function sets the percentage of an element and gets the image depending of it
     * 
     * @param {number} percentage - percentage of the status of the element
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

/**
 * This function resolves the index of the image depending on percentage
 * 
 * @returns index of Image
 */
    resolveImageIndex() {
        if (this.percentage >= 90) return 5;
        else if (this.percentage >= 70) return 4;
        else if (this.percentage >= 50) return 3;
        else if (this.percentage >= 30) return 2;
        else if (this.percentage >= 10) return 1;
        else return 0;
    }
}