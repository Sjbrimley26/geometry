const Random = {
  int(min, max) { // includes both the min and max
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  coinToss() {
    return this.int(0, 9) >= 5;
  },

  letter() { // returns an upper or lower case letter
    const code = this.coinToss() ? this.int(65, 90) : this.int(97, 122);
    return String.fromCharCode(code);
  },

  string(len = 8) {
    return sum(range(0, len).map(_ => this.letter()), "");
  },

  chain() { // returns a string of letters and numbers 8 - 16 characters long
    const length = this.int(8, 16);
    return sum(
      range(0, length).map(
        _ => this.coinToss() ? this.int(0, 9) : this.letter()
      ), ""
    );
  },

  shuffle(arr) {
    if (!Array.isArray(arr)) return undefined;
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      let j = this.int(0, i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
};

module.exports = Random;
 