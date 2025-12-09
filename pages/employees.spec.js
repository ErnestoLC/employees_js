import {expect} from '@playwright/test';

export class Employees {

    constructor(page){
        this.page = page
        this.title = page.locator(".navbar-brand")
        this.title_text = "Paylocity Benefits Dashboard"
        this.add_employee_button = page.locator("#add")
        this.input_first_name = page.locator("#firstName")
        this.input_last_name = page.locator("#lastName")
        this.input_dependants = page.locator("#dependants")
        this.add_button = page.locator("#addEmployee")
        this.employees_table = "#employeesTable"
        this.update_button = page.locator("#updateEmployee")
        this.delete_button = page.locator("#deleteEmployee")
    }

    async validateDashboardTitle() {
        await expect(this.title).toHaveText(this.title_text)
    }
    
    async clickAddEmployeeButton() {
        await this.add_employee_button.click()
    }

    async fillAddEmployee(first_name, last_name, dependants) {
        await this.input_first_name.fill(first_name)
        await this.input_last_name.fill(last_name)
        await this.input_dependants.fill(dependants)
        await this.add_button.click()
    }

    async validateEmployeePresent(name) {
       await expect(this.page.locator('//td[text()="'+name+'"]')).toBeEnabled()
    }

    async validateBenefitCost(name) {
       const row = await this.page.locator('//tr[td[text()="'+name+'"]]')
       const gross_pay = await row.locator('td').nth(5).innerText()
       const benefit_cost = await row.locator('td').nth(6).innerText()
       const net_pay = await row.locator('td').nth(7).innerText()
       expect(parseFloat(benefit_cost) + parseFloat(net_pay)).toBe(parseFloat(gross_pay))
    }

    async editEmployeeName(name, new_name) {
       const row = await this.page.locator('//tr[td[text()="'+name+'"]]')
       await row.locator(".fa-edit").click()
       await this.input_first_name.fill(new_name)
       await this.update_button.click()
    }

    async deleteEmployee(name) {
       const row = await this.page.locator('//tr[td[text()="'+name+'"]]')
       await row.locator(".fa-times").click()
       await this.delete_button.click()
       await this.page.waitForTimeout(500)
       expect(await this.page.locator('//td[text()="'+name+'"]').count()).toBe(0)
       
    }
}
