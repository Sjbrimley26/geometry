const normals = {
  normals: {
    get: function() {
      const { edges } = this;
      return edges.map(e => e.getPerpendicular());
    }
  }
};

module.exports = normals;
