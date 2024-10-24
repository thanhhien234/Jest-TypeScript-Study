/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import LoginComponent from "./LoginComponent";
import { act } from "react";

describe('LoginComponent test cases', () => {

    const loginServiceMock = {
        login: jest.fn()
    }
    const setTokenMock = jest.fn();

    function setup(){
        render(<LoginComponent loginService={loginServiceMock} setToken={setTokenMock} />);
    }

    beforeEach(() => {
        setup();
    });

    test('should render login form', () => {
        const mainElement = screen.getByRole('main');
        expect(mainElement).toBeInTheDocument(); 
        expect(screen.queryByTestId('resultLabel')).not.toBeInTheDocument();
        expect(screen.getAllByTestId('input')).toHaveLength(3);
    });

    test('input values should be empty', () => {
        const inputs = screen.getAllByTestId('input');
        expect(inputs[0]).toHaveValue('');
        expect(inputs[1]).toHaveValue('');
        expect(inputs[2]).toHaveValue('Login');
    });

    test('click login button without entering username and password', () => {
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        expect(screen.getByTestId('resultLabel').textContent).toBe('UserName and password required!');

        //user and fireEvent are the same
        user.click(loginButton);
        expect(screen.getByTestId('resultLabel').textContent).toBe('UserName and password required!');
    });


    //test async function
    test('login successfully - using fireEvent', async () => {
        loginServiceMock.login.mockResolvedValue('1234');
        const inputs = screen.queryAllByTestId('input');
        const userNameInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(userNameInput, { target: { value: 'someUser' } });
        fireEvent.change(passwordInput, { target: { value: 'somePassword' } });
        fireEvent.click(loginButton);

        const resultLabel = await screen.findByTestId('resultLabel');
        expect(resultLabel.textContent).toBe('successful login');
    });

    //test async function with act
    test('login successfully - using user event', async () => {
        loginServiceMock.login.mockResolvedValue('1234');
        const inputs = screen.queryAllByTestId('input');
        const userNameInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        act(() => {
            user.click(userNameInput);
            user.keyboard('someUser');
            user.click(passwordInput);
            user.keyboard('somePassword');

            user.click(loginButton);
        });

        const resultLabel = await screen.findByTestId('resultLabel');
        expect(resultLabel.textContent).toBe('successful login');
    });

    test ('unsuccessful login', async () => {
        const result = Promise.resolve(undefined);
        loginServiceMock.login.mockResolvedValue(result);
        const inputs = screen.queryAllByTestId('input');
        const userNameInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(userNameInput, { target: { value: 'someUser' } });
        fireEvent.change(passwordInput, { target: { value: 'somePassword' } });
        fireEvent.click(loginButton);

        expect(loginServiceMock.login).toHaveBeenCalledWith('someUser', 'somePassword');

        const resultLabel = await screen.findByTestId('resultLabel');
        expect(resultLabel.textContent).toBe('invalid credentials');
    });
});

