import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5000/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}getincomes`)
        setIncomes(response.data);
        console.log("Incomes",response.data)
    }

    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}addincome`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes();
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}deleteincome/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}addexpense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}getexpenses`)
        setExpenses(response.data)
        console.log("Expense",response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}deleteexpense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalexpense = 0;
        expenses.forEach((expense) =>{
            totalexpense = totalexpense + expense.amount
        })

        return totalexpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

  



    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}