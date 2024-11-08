import styled from "styled-components";
import { SlCalender } from "react-icons/sl";
import { MdClear } from "react-icons/md";
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
  const [backwardMonth, setBackwardMonth] = useState<number>(
    new Date().getMonth()
  );
  const [enteredYear, setEnteredYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [startDate, setStartDate] = useState<number>(0);
  const [endDate, setEndDate] = useState<number>(0);

  useEffect(() => {
    if (startDate !== 0) {
      setSelectedStartDate(
        `${startDate}/${
          backwardMonth !== 0 ? backwardMonth + 1 : selectedMonth.value + 1
        }/${enteredYear}`
      );
    }
    if (endDate !== 0) {
      setSelectedEndDate(
        `${endDate}/${selectedMonth.value + 1}/${enteredYear}`
      );
    }
  }, [selectedMonth, enteredYear, startDate, endDate]);

  const onClear = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    setSelectedEndDate("--");
    setSelectedStartDate("--");
    setBackwardMonth(0);
    setEndDate(0);
    setStartDate(0);
    setSelectedMonth({
      value: new Date().getMonth(),
      label: Months[new Date().getMonth()],
    });
    setEnteredYear(new Date().getFullYear().toString());
  };

  return (
    <Wrapper>
      <DatePickerWrapper
        onClick={() => setIsCalenderVisible(!isCalenderVisible)}
      >
        <span>
          {selectedStartDate} To {selectedEndDate}
        </span>
        {selectedStartDate === "--" && selectedEndDate === "--" ? (
          <SlCalender />
        ) : (
          <MdClear onClick={(e) => onClear(e)} />
        )}
      </DatePickerWrapper>
      {isCalenderVisible && (
        <Calender
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          enteredYear={enteredYear}
          setEnteredYear={setEnteredYear}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setIsCalenderVisible={setIsCalenderVisible}
          setBackwardMonth={setBackwardMonth}
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
