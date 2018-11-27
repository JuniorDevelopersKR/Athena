class SttBoardProgress {
  progress = false

  setProgress = () => {
    this.progress = !this.progress
  }

  getProgress = () => {
    return this.progress
  }
}
export default SttBoardProgress
