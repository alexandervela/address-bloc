const MenuController = require("../controllers/MenuController");
const newController = beforeEach(() => {
  this.menu = new MenuController();
});

describe("MenuController", () => {
    describe("#remindMe()", () => {
      newController;
      it("should return a string containing the text 'Learning is a life-long pursuit'", () => {
        expect(this.menu.remindMe()).toBe("Learning is a life-long pursuit");
      });
    }) 
  });