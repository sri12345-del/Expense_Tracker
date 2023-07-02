import { render ,screen} from "@testing-library/react";
import Async from "./asyns";
import userEvent from "@testing-library/user-event";

describe("asyns item", () => {
    test("postitem", () => {
        render(<Async></Async>)

        const item = screen.getByText("i am srinivas")
        expect(item).toBeInTheDocument()
    });
    test("visible", () => {
        render(<Async></Async>)
        const visible = screen.getByText("this is not visible", { exact: false })
        expect(visible).toBeInTheDocument()
    });
    test("invisible", () => {
        render(<Async></Async>)
        const button = screen.getByRole("button")
        userEvent.click(button)

        const notvisible = screen.getByText("this is visible",{exact:false})
        expect(notvisible).toBeInTheDocument()

    })
    test("test4", () => {
        render(<Async></Async>)

        const buttonval = screen.getByRole("button")
        userEvent.click(buttonval)

        const buttonnot = screen.queryByText("this is not visible")
        expect(buttonnot).toBeNull()
    })
    test("render the posts", async () => {
        window.fetch = jest.fn()
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ id: "f1", title: "first title" }]
        })
        render(<Async></Async>)
        const data = await screen.findAllByRole("listitem")
        expect(data).not.toHaveLength(0)
        
    });
    
   

})