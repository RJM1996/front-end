export default class PreviewImg {
  constructor(file) {
    this.file = file;
    this.element = this.createElement();
    this.setImg();
  }

  updateProgress(loaded, total) {
    const percent = this.calculPercent(loaded, total);

    this.showProgress();
    this.updateProgressView(percent);

    if (this.isDone(percent)) {
      this.hideProgress();
    }
  }

  isDone(percent) {
    return percent >= 100;
  }

  calculPercent(loaded, total) {
    return Math.floor((loaded / total) * 100);
  }

  hideProgress() {
    this.element.querySelector(".myProgress").style.display = "none";
  }

  updateProgressView(percent) {
    this.element.querySelector(".plan").style.width = percent + "%";
    this.element.querySelector(".val").innerText = percent + "%";
  }

  showProgress() {
    this.element.querySelector(".myProgress").style.display = "block";
  }

  getFile() {
    return this.file;
  }

  setImg() {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.element.querySelector("img").setAttribute("src", fileReader.result);
    };

    fileReader.readAsDataURL(this.file);
  }

  createElement() {
    const div = document.createElement("div");
    div.classList.add("uploadPhotoItem");

    div.innerHTML = `
                <span class="myProgress">
                <span class="plan"></span>
                <span class="val">30%</span>
            </span>
            <img src="img/1.jpg" />
            <span class="pictureName">
                ${this.file.name}
            </span>
    `;

    document.querySelector(".wantUpload").appendChild(div);
    return div;
  }
}
