// pages/calc/normal/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: "0",
    inputNumber: [""],
    caluRes: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //回复初始状态
  bindAC() {
    try{
      this.setData({
        result: "0",
        inputNumber: ["0"],
        operator: "",
        caluRes: ""
      })
    }catch(e){
      app.error({
        page: "/pages/calc/normal",
        func: "bindAC",
        err: e
      })
    }
  },
  //取反
  bindInverse() {
    try {
      let inputNumber = this.data.inputNumber,
        index = this.data.inputNumber.length - 1;
      if (Number(inputNumber[index]) > 0) {
        inputNumber[index] = "-" + inputNumber[index];
      } else {
        inputNumber[index] = inputNumber[index].split("-")[1];
      }
      this.setData({
        result: inputNumber[index],
        inputNumber: inputNumber
      })
    } catch (e) {
      app.error({
        page: "/pages/calc/normal",
        func: "bindInverse",
        err: e
      })
    }
  },
  /**
   * 输入数字
   */
  bindNumber(e) {
    try {
      let number = e.currentTarget.dataset.number,
        inputNumber = this.data.inputNumber,
        result = this.data.result,
        operator = this.data.operator,
        index = this.data.inputNumber.length - 1;
      if (inputNumber[index].length > 9) {
        return false;
      }
      if (this.data.caluRes == "") {
        inputNumber[index] = inputNumber[index] == "0" ? "" : inputNumber[index];
        inputNumber[index] = inputNumber[index] + number;
        this.showResult(inputNumber[index]);
      } else {
        inputNumber[index] = "" + number;
        this.showResult(inputNumber[index]);
      }
      this.setData({
        caluRes: "",
        inputNumber: inputNumber
      })
    } catch (e) {
      app.error({
        page: "/pages/calc/normal",
        func: "bindNumber",
        err: e
      })
    }
  },
  /**
   * 输入操作符
   */
  bindOperator(e) {
    try {
      let operator = e.currentTarget.dataset.operator,
        inputNumber = this.data.inputNumber;
      if (inputNumber[0] != "") {
        inputNumber.push("0");
        this.setData({
          operator: operator,
          inputNumber: inputNumber
        })
      }
    } catch (e) {
      app.error({
        page: "/pages/calc/normal",
        func: "bindOperator",
        err: e
      })
    }
  },
  /**
   * 点击等号，进行计算
   */
  bindEqual() {
    try {
      let inputNumber = this.data.inputNumber,
        operator = this.data.operator,
        result = this.calc(inputNumber, operator);
      this.showResult(result);
      inputNumber = [result];
      this.setData({
        inputNumber: inputNumber,
        caluRes: result
      })
    } catch (e) {
      app.error({
        page: "/pages/calc/normal",
        func: "bindEqual",
        err: e
      })
    }
  },
  /**
   * 计算函数
   */
  calc(inputNumber, operator) {
    try {
      let res = 0;
      switch (operator) {
        case "+":
          res = Number(inputNumber[0]) + Number(inputNumber[1]);
          break;
        case "-":
          res = Number(inputNumber[0]) - Number(inputNumber[1]);
          break;
        case "*":
          res = Number(inputNumber[0]) * Number(inputNumber[1]);
          break;
        case "/":
          res = Number(inputNumber[0]) / Number(inputNumber[1]);
          break;
        case "%":
          res = Number(inputNumber[0]) % Number(inputNumber[1]);
          break;
      }
      let allLength = res.toString().length,
        intLength = res.toFixed(0).toString().length,
        dotLength = allLength - intLength;
      if (allLength > 10) {
        if (dotLength > 4) { //限制小数位的精度
          res = res.toFixed(4);
        }
        if (intLength > 10) { //转换科学技术法
          res = res.toExponential(3);
        }
      }
      return res;
    } catch (e) {
      app.error({
        page: "/pages/calc/normal",
        func: "calc",
        err: e
      })
    }
  },
  showResult(result) {
    this.setData({
      result: result
    })
  }
})