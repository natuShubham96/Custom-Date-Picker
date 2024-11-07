import styled from "styled-components";
import Select from "react-select";
import { Days, MonthOptions } from "./constants";
import { useEffect, useState } from "react";
import { generateCalendar } from "./utils";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    height: "35px",
    width: "150px",
    fontSize: "14px",
  }),
};

interface Props {
  setSelectedStartDate: (arg0: string) => void;
  setSelectedEndDate: (arg0: string) => void;
  selectedMonth: any;
  setSelectedMonth: Function;
  enteredYear: string;
  setEnteredYear: (arg0: string) => void;
  startDate: number;
  setStartDate: (arg0: number) => void;
  endDate: number;
  setEndDate: (arg0: number) => void;
  setIsCalenderVisible: (arg0: boolean) => void;
}

const Calender = ({
  setSelectedStartDate,
  setSelectedEndDate,
  selectedMonth,
  setSelectedMonth,
  enteredYear,
  setEnteredYear,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setIsCalenderVisible,
}: Props) => {
  const [generatedCalender, setGeneratedCalender] = useState<any>([]);
  const [hoveredDate, setHoveredDate] = useState<number>(0);

  useEffect(() => {
    setGeneratedCalender(generateCalendar(enteredYear, selectedMonth.value));
  }, [selectedMonth, enteredYear, startDate, endDate]);

  const handleMonthChange = (selectedOption: any) => {
    setSelectedMonth(selectedOption);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredYear(event?.target?.value || enteredYear);
  };

  const onDateHover = (event: any) => {
    if (
      startDate !== event?.target?.textContent &&
      endDate !== event?.target?.textContent
    )
      setHoveredDate(event?.target?.textContent || 0);
  };

  const onDateClick = (event: any) => {
    if (startDate === 0 && endDate === 0) {
      setStartDate(event?.target?.textContent || 0);
    } else if (startDate !== 0) {
      if (startDate < event?.target?.textContent) {
        setEndDate(event?.target?.textContent || 0);
      } else {
        setEndDate(startDate);
        setStartDate(event?.target?.textContent || 0);
      }
    } else if (startDate.toString() === event?.target?.textContent) {
      setStartDate(0);
    } else if (endDate.toString() === event?.target?.textContent) {
      setEndDate(0);
    }
  };

  const onOptionsClick = (option: string) => {
    if (option === "today") {
      setStartDate(new Date().getDate());
      setEndDate(new Date().getDate());
      setIsCalenderVisible(false);
    } else if (option === "yesterday") {
      setStartDate(new Date().getDate() - 1);
      setEndDate(new Date().getDate() - 1);
      setIsCalenderVisible(false);
    } else if (option === "last 7 days") {
      setStartDate(new Date().getDate() - 7);
      setEndDate(new Date().getDate());
      setIsCalenderVisible(false);
    }
    if (option === "last 30 days") {
      setStartDate(new Date().getDate() - 30);
      setEndDate(new Date().getDate());
      setIsCalenderVisible(false);
    }
  };

  return (
    <>
      <CalenderWrapper>
        <InputsWrapper>
          <Select
            options={MonthOptions}
            onChange={handleMonthChange}
            placeholder="Select a Month"
            value={selectedMonth}
            styles={customStyles}
          />
          <YearInput
            type="number"
            placeholder="Enter year"
            value={enteredYear}
            onChange={(e) => handleYearChange(e)}
          />
        </InputsWrapper>
        <DaysWrapper>
          {Days.map((day) => (
            <ValueWrapper>{day}</ValueWrapper>
          ))}
        </DaysWrapper>
        <DatesWrapper>
          {generatedCalender.map((calender: any) => (
            <DatesChildWrapper>
              {calender.map((cal: any, index: number) => (
                <ValueWrapper
                  style={{
                    color: index === 0 || index === 6 ? "gray" : "black",
                    backgroundColor:
                      hoveredDate === cal?.toString()
                        ? "#cce9ff"
                        : startDate.toString() === cal?.toString() ||
                          endDate.toString() === cal?.toString()
                        ? "#1675e0"
                        : cal > startDate &&
                          cal < endDate &&
                          index !== 0 &&
                          index !== 6
                        ? "#cce9ff"
                        : "",
                    cursor: index !== 0 && index !== 6 ? "pointer" : "",
                  }}
                  onClick={(e) => index !== 0 && index !== 6 && onDateClick(e)}
                  onMouseEnter={(e) => onDateHover(e)}
                  onMouseLeave={() => setHoveredDate(0)}
                >
                  {cal ? cal : "\u00A0"}
                </ValueWrapper>
              ))}
            </DatesChildWrapper>
          ))}
          <OptionsWrapper>
            {["Today", "Yesterday", "Last 7 days"].map((option) => (
              <div
                onClick={() => onOptionsClick(option.toLowerCase())}
                style={{ cursor: "pointer" }}
              >
                {option}
              </div>
            ))}
          </OptionsWrapper>
          <SubmitButton onClick={() => setIsCalenderVisible(false)}>
            Submit
          </SubmitButton>
        </DatesWrapper>
      </CalenderWrapper>
    </>
  );
};

const SubmitButton = styled.button`
  width: 100px;
  cursor: pointer;
`;

const CalenderWrapper = styled.div`
  height: 300px;
  width: 300px;
  border: 1px solid black;
  padding: 2px;
`;

const InputsWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const YearInput = styled.input`
  height: 35px;
  width: 130px;
  font-size: 14px;
  border-radius: 4px;
  padding: 0;
  padding-left: 2px;
  border-color: hsl(0, 0%, 80%);
`;

const DaysWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const DatesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DatesChildWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const ValueWrapper = styled.span`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OptionsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export default Calender;
