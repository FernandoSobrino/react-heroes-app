import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context";
import { Navbar } from "../../../src/ui/components/Navbar";

const mockedUsedNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));


describe('Pruebas en <Navbar />', () => { 

  const contextValue = {
    logged: true,
    user: {
      name: 'Juan Carlos'
    },
    logout: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks());

  
  test('Debe mostrar el username loggeado', () => {

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )


    expect(screen.getByText('Juan Carlos')).toBeTruthy();
   
  });

 
  test('Debe llamar el logout y navigate al hacer click en el botón', () => {
  

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const logoutBtn = screen.getByRole('button');
    fireEvent.click(logoutBtn);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/login", { "replace": true })
});
  
});

  



