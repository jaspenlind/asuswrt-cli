const formatDate = (interval = 0) => {
  var d = new Date();
  d.setDate(d.getDate() - 1);

  return d
    .toJSON()
    .slice(0, 10)
    .replace(/[-T]/g, "-");
};

const yesterday = () => formatDate(-1);

module.exports = {
  yesterday: yesterday
};
