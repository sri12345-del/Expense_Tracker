import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greet from "./greet";

describe("alltest", () => {
    test("expense list page", () => {
        render(<Greet></Greet>)

        const money = screen.getByText("hello world")
        expect(money).toBeInTheDocument();
    });

    test("expenselist2", () => {
        render(<Greet></Greet>)
        const price = screen.getByText("price")
        expect(price).toBeInTheDocument();
    });
    test("test3", () => {
        render(<Greet></Greet>)

        const isvisible = screen.getByText("it is not visible")
        expect(isvisible).toBeInTheDocument()
    })
    test("test4", () => {
        render(<Greet></Greet>)
        
        const button = screen.getByRole("button")
        userEvent.click(button)

        const visible = screen.getByText("it is visible")
        expect(visible).toBeInTheDocument()
    })
    test("does not render button is clicked", () => {
        render(<Greet></Greet>)
        const button = screen.getByRole("button")
        userEvent.click(button)

        const outputelement = screen.queryByText("it is not visible")
        expect(outputelement).toBeNull()
    })
})
        
        


   