var timeOut;

class Item {
    constructor(icon, link, txt) {
        this.$element = $(document.createElement("a"));
        this.icon = icon;
        this.$element.attr("href", link)
        this.$element.addClass("item");
        this.$element.css("background-color", "transparent");
        var i = document.createElement("img");
        $(i).attr("src", `./../assets/images/menu/${icon}.svg`)
        $(i).attr("title", txt)
        this.$element.append(i);
        this.prev = null;
        this.next = null;
        this.isMoving = false;
        var element = this;
        this.$element.on("mousemove", function () {
            clearTimeout(timeOut);
            timeOut = setTimeout(function () {
                if (element.next && element.isMoving) {
                    element.next.moveTo(element);
                }
            }, 10);
        });
    }

    moveTo(item) {
        anime({
            targets: this.$element[0],
            left: item.$element.css("left"),
            top: item.$element.css("top"),
            duration: 700,
            elasticity: 500
        });
        if (this.next) {
            this.next.moveTo(item);
        }
    }

    updatePosition() {
        document.getElementById("menu-shadow").style.zIndex = 101
        anime({
            targets: this.$element[0],
            left: this.prev.$element.css("left"),
            top: this.prev.$element.css("top"),
            duration: 80
        });

        if (this.next) {
            this.next.updatePosition();
        }
    }
}

class Menu {
    constructor(menu) {
        this.$element = $(menu);
        this.size = 0;
        this.first = null;
        this.last = null;
        this.timeOut = null;
        this.hasMoved = false;
        this.status = "closed";
    }

    add(item) {
        var menu = this;
        if (this.first == null) {
            this.first = item;
            this.last = item;
            this.first.$element.on("mouseup", function () {
                if (menu.first.isMoving) {
                    menu.first.isMoving = false;
                } else {
                    menu.click();
                }
            });
            item.$element.draggable(
                {
                    start: function () {
                        menu.close();
                        item.isMoving = true;
                    }
                },
                {
                    drag: function () {
                        if (item.next) {
                            item.next.updatePosition();
                        }
                    }
                },
                {
                    stop: function () {
                        item.isMoving = false;
                        item.next.moveTo(item);
                    }
                }
            );
        } else {
            this.last.next = item;
            item.prev = this.last;
            this.last = item;
        }
        this.$element.after(item.$element);


    }

    open() {
        let items = document.getElementsByClassName("item")
        let num = 60 * items.length
        let leftInfo = items[items.length - 1].style.left
        leftInfo = Math.abs(Number(leftInfo.substr(0, leftInfo.length - 2)))

        this.status = "open";
        var current = this.first.next;
        var iterator = 1;
        var head = this.first;
        var sens = head.$element.css("left") < head.$element.css("right") ? 1 : -1;
        sens = 1
        if (leftInfo < num) {
            sens = -1
        }
        while (current != null) {
            anime({
                targets: current.$element[0],
                left: parseInt(head.$element.css("left"), 10) + (sens * (iterator * 64)),
                top: head.$element.css("top"),
                duration: 500
            });
            iterator++;
            current = current.next;
        }
    }

    close() {
        this.status = "closed";
        var current = this.first.next;
        var head = this.first;
        var iterator = 1;
        while (current != null) {
            anime({
                targets: current.$element[0],
                left: head.$element.css("left"),
                top: head.$element.css("top"),
                duration: 500
            });
            iterator++;
            current = current.next;
        }
    }

    click() {
        if (this.status == "closed") {
            this.open();
        } else {
            this.close();
        }
    }

}

document.getElementById("menu-shadow").onclick = () => {
    let elem = document.getElementsByClassName("item")
    let len = elem.length - 1

    document.getElementsByClassName("item")[len].style.top = 0;
    document.getElementsByClassName("item")[len].style.left = 0;
    menu.close()
    document.getElementById("menu-shadow").style.zIndex = 90
}

var menu = new Menu("#myMenu");
var item1 = new Item("menu", "javascript:void(0)", "Drag me..!");
var item2 = new Item("home", "#home", "Home");
var item3 = new Item("home", "./event.html", "Event Page");
var item4 = new Item("home", "./registration.html", "Registration");
// var item5 = new Item("link", "#64F592");

menu.add(item1);
menu.add(item2);
menu.add(item3);
menu.add(item4);
// menu.add(item5);
$(document).delay(50).queue(function (next) {
    menu.open();
    next();
    $(document).delay(1000).queue(function (next) {
        menu.close();
        next();
    });
});