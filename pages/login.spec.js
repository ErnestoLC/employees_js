import { expect } from "@playwright/test"

export class Login {

    constructor(page){
        this.page = page
        this.user = page.locator("#Username")
        this.pass = page.locator("#Password")
        this.login_button = page.locator("button:visible")

        this.title = page.locator(".navbar-brand")
        this.title_text = "Paylocity Benefits Dashboard"
    }
    
    async goTo(){
        await this.page.goto(`${process.env.EMPLOYEES}`, { waitUntil: 'networkidle' })
    }
    
    async login(){
        await this.user.fill(`${process.env.USER}`)
        await this.pass.fill(`${process.env.PASS}`)
        await this.login_button.click()
        await this.page.waitForTimeout(5000)
    }
}