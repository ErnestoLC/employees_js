import { test, expect } from '@playwright/test';
import { Login } from '../pages/login.spec';
import { Employees } from '../pages/employees.spec';

test('Add employees', async ({ page }) => {
    const login = new Login(page)
    const employees = new Employees(page)
    const name = String(Date.now())
    
    await login.goTo()
    await login.login()
    await employees.validateDashboardTitle()

    await employees.clickAddEmployeeButton()
    await employees.fillAddEmployee(name, "López", "5")
    await employees.validateEmployeePresent(name)
    await employees.validateBenefitCost(name)
    await employees.deleteEmployee(name)

});

test('Edit employees', async ({ page }) => {
    const login = new Login(page)
    const employees = new Employees(page)
    const name = String(Date.now())
    
    await login.goTo()
    await login.login()
    await employees.validateDashboardTitle()

    await employees.clickAddEmployeeButton()
    await employees.fillAddEmployee(name, "López", "5")

    const new_name = "new"+name
    await employees.editEmployeeName(name, new_name)
    await employees.validateEmployeePresent(new_name)
    await employees.deleteEmployee(new_name)
});

test('Delete employees', async ({ page }) => {
    const login = new Login(page)
    const employees = new Employees(page)
    const name = String(Date.now())
    
    await login.goTo()
    await login.login()
    await employees.validateDashboardTitle()

    await employees.clickAddEmployeeButton()
    await employees.fillAddEmployee(name, "López", "5")
    await employees.deleteEmployee(name)
});
