import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

// Connects to data-controller="chatroom"
export default class extends Controller {
  static values = { id: Number }
  static targets = ["messages"]

  connect() {
    console.dir(this.channel)
    this.channel = createConsumer().subscriptions.create(
      {channel: "ChatroomChannel", id: this.idValue},
      {received: data => this.#insertMessageAndScroll(data)}
    )
    // console.log(`Subscribe to the chatroom ID: ${this.idValue}`)
    console.log(this.messagesTarget.scrollHeight)
    console.dir(this.channel)
  }

  disconnect() {
    this.channel.unsubscribe()
  }
  
  #insertMessageAndScroll(data) {
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }
  resetForm(event) {
    event.target.reset()
  }
}
