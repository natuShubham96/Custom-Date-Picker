import styled from "styled-components";
import { SlCalender } from "react-icons/sl";
import { useEffect, useState } from "react";
import Calender from "./Calender";
import { Months } from "./constants";

const DatePicker = () => {
  const [isCalenderVisible, setIsCalenderVisible] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<string>("--");
  const [selectedEndDate, setSelectedEndDate] = useState<string>("--");
  const [selectedMonth, setSelectedMonth] = useState({
    value: new Date().getMonth(),
    label: Months[new Date().getMonth()],
  });
  const [enteredYear, setEnteredYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [startDate, setStartDate] = useState<number>(0);
  const [endDate, setEndDate] = useState<number>(0);

  useEffect(() => {

    if (startDate !== 0) {
      setSelectedStartDate(
        `${startDate}/${selectedMonth.value + 1}/${enteredYear}`
      );
    }
    if (endDate !== 0) {
      setSelectedEndDate(
        `${endDate}/${selectedMonth.value + 1}/${enteredYear}`
      );
    }
  }, [selectedMonth, enteredYear, startDate, endDate]);

  return (
    <Wrapper>
      <DatePickerWrapper
        onClick={() => setIsCalenderVisible(!isCalenderVisible)}
      >
        <span>
          {selectedStartDate} To {selectedEndDate}
        </span>
        <SlCalender />
      </DatePickerWrapper>
      {isCalenderVisible && (
        <Calender
          setSelectedStartDate={setSelectedStartDate}
          setSelectedEndDate={setSelectedEndDate}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          enteredYear={enteredYear}
          setEnteredYear={setEnteredYear}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setIsCalenderVisible={setIsCalenderVisible}
        ></Calender>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DatePickerWrapper = styled.div`
  background-color: white;
  width: 250px;
  height: 20px;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default DatePicker;
