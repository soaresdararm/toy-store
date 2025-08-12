"use client";

import { addYears, format, isValid, parse, parseISO, subYears, setMonth, getMonth, getYear, setYear } from "date-fns";
import { useEffect, useState, type ChangeEvent } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { cn } from "../lib/utils";
import { CalendarMark } from "./icons";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
	value?: string;
	onChange: (value: string | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	yearLimitPast?: number;
	yearLimitFuture?: number;
	mode?: "day" | "month" | "year" | "range";
}

function MonthSelector({
	selected,
	onSelect,
	minDate,
	maxDate,
}: {
	selected?: Date;
	onSelect: (date: Date) => void;
	minDate: Date;
	maxDate: Date;
}) {
	const [currentYear, setCurrentYear] = useState(selected ? getYear(selected) : getYear(new Date()));

	const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

	const handleMonthClick = (monthIndex: number) => {
		const newDate = setMonth(setYear(new Date(), currentYear), monthIndex);
		if (newDate >= minDate && newDate <= maxDate) {
			onSelect(newDate);
		}
	};

	const handlePrevYear = () => {
		const newYear = currentYear - 1;
		if (newYear >= getYear(minDate)) {
			setCurrentYear(newYear);
		}
	};

	const handleNextYear = () => {
		const newYear = currentYear + 1;
		if (newYear <= getYear(maxDate)) {
			setCurrentYear(newYear);
		}
	};

	const isMonthDisabled = (monthIndex: number) => {
		const monthDate = setMonth(setYear(new Date(), currentYear), monthIndex);
		return monthDate < minDate || monthDate > maxDate;
	};

	const isMonthSelected = (monthIndex: number) => {
		return selected && getYear(selected) === currentYear && getMonth(selected) === monthIndex;
	};

	return (
		<div className="w-80 rounded-lg bg-white p-4 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<Button
					variant="neutral"
					hierarchy="secondary"
					onClick={handlePrevYear}
					disabled={currentYear <= getYear(minDate)}
					className="hover:bg-primary hover:text-neutral-0 h-8 w-8 border-0 p-0 shadow-none"
				>
					<ChevronLeft className="h-4 w-4 text-gray-50" />
				</Button>
				<h2 className="text-gray-80 text-xl font-semibold">{currentYear}</h2>
				<Button
					variant="neutral"
					hierarchy="secondary"
					onClick={handleNextYear}
					disabled={currentYear >= getYear(maxDate)}
					className="hover:bg-primary hover:text-neutral-0 h-8 w-8 border-0 p-0 shadow-none"
				>
					<ChevronRight className="h-4 w-4 text-gray-50" />
				</Button>
			</div>

			{/* Grade de meses */}
			<div className="grid grid-cols-3 gap-3">
				{months.map((month, index) => (
					<Button
						key={month}
						variant={isMonthSelected(index) ? "primary" : "neutral"}
						hierarchy={isMonthSelected(index) ? "primary" : "tertiary"}
						onClick={() => handleMonthClick(index)}
						disabled={isMonthDisabled(index)}
						className={cn(
							"h-10 rounded-md border-0 text-base font-medium transition-all duration-200",
							isMonthSelected(index)
								? "bg-primary text-neutral-0 hover:bg-primary shadow-md"
								: "text-gray-70 hover:bg-neutral-10 bg-gray-50 shadow-none",
							isMonthDisabled(index) && "cursor-not-allowed opacity-40",
						)}
					>
						{month}
					</Button>
				))}
			</div>
		</div>
	);
}

function YearSelector({
	selected,
	onSelect,
	minDate,
	maxDate,
}: {
	selected?: Date;
	onSelect: (date: Date) => void;
	minDate: Date;
	maxDate: Date;
}) {
	const minYear = getYear(minDate);
	const maxYear = getYear(maxDate);
	const currentYear = selected ? getYear(selected) : getYear(new Date());

	const [startYear, setStartYear] = useState(() => {
		const yearToCenter = currentYear;
		return Math.max(minYear, yearToCenter - 6);
	});

	const years = Array.from({ length: 12 }, (_, i) => startYear + i).filter((year) => year >= minYear && year <= maxYear);

	const handleYearClick = (year: number) => {
		const newDate = setYear(new Date(), year);
		if (newDate >= minDate && newDate <= maxDate) {
			onSelect(newDate);
		}
	};

	const handlePrevYears = () => {
		const newStartYear = Math.max(minYear, startYear - 12);
		setStartYear(newStartYear);
	};

	const handleNextYears = () => {
		const newStartYear = Math.min(maxYear - 11, startYear + 12);
		setStartYear(newStartYear);
	};

	const isYearSelected = (year: number) => {
		return selected && getYear(selected) === year;
	};

	const rangeStart = years[0];
	const rangeEnd = years[years.length - 1];

	return (
		<div className="w-80 rounded-lg bg-white p-4 shadow-sm">
			{/* Header com navegação */}
			<div className="mb-6 flex items-center justify-between">
				<Button
					variant="neutral"
					hierarchy="secondary"
					onClick={handlePrevYears}
					disabled={startYear <= minYear}
					className="hover:bg-primary hover:text-neutral-0 h-8 w-8 border-0 p-0 shadow-none"
				>
					<ChevronLeft className="h-4 w-4 text-gray-500" />
				</Button>
				<h2 className="text-xl font-semibold text-gray-800">
					{rangeStart} - {rangeEnd}
				</h2>
				<Button
					variant="neutral"
					hierarchy="secondary"
					onClick={handleNextYears}
					disabled={startYear + 12 > maxYear}
					className="hover:bg-primary hover:text-neutral-0 h-8 w-8 border-0 p-0 shadow-none"
				>
					<ChevronRight className="h-4 w-4 text-gray-500" />
				</Button>
			</div>

			{/* Grade de anos */}
			<div className="grid grid-cols-3 gap-3">
				{years.map((year) => (
					<Button
						key={year}
						variant={isYearSelected(year) ? "primary" : "neutral"}
						hierarchy={isYearSelected(year) ? "primary" : "tertiary"}
						onClick={() => handleYearClick(year)}
						className={cn(
							"h-10 rounded-md border-0 text-base font-medium transition-all duration-200",
							isYearSelected(year)
								? "bg-primary text-neutral-0 hover:bg-primary shadow-md"
								: "text-gray-70 hover:bg-neutral-10 bg-gray-50 shadow-none",
						)}
					>
						{year}
					</Button>
				))}
			</div>
		</div>
	);
}

export function DatePicker({
	value,
	onChange,
	placeholder = "dd/mm/aaaa",
	disabled = false,
	className,
	yearLimitPast = 100,
	yearLimitFuture = 50,
	mode = "day",
}: DatePickerProps) {
	const [stringDate, setStringDate] = useState<string>("");
	const [internalDate, setInternalDate] = useState<Date | undefined>(undefined);

	const minDate = yearLimitPast ? subYears(new Date(), yearLimitPast) : new Date(1900, 0, 1);
	const maxDate = addYears(new Date(), yearLimitFuture);

	const getDateFormat = () => {
		switch (mode) {
			case "month":
				return "MM/yyyy";
			case "year":
				return "yyyy";
			case "day":
			default:
				return "dd/MM/yyyy";
		}
	};

	const getPlaceholder = () => {
		switch (mode) {
			case "month":
				return placeholder || "mm/aaaa";
			case "year":
				return placeholder || "aaaa";
			case "day":
			default:
				return placeholder || "dd/mm/aaaa";
		}
	};

	useEffect(() => {
		if (value) {
			const dateFormat = getDateFormat();
			const parsed = parse(value, dateFormat, new Date());
			if (isValid(parsed)) {
				setInternalDate(parsed);
				setStringDate(format(parsed, dateFormat));
			} else {
				setInternalDate(undefined);
				setStringDate(value);
			}
		} else {
			setInternalDate(undefined);
			setStringDate("");
		}
	}, [value, mode]);

	function formatInput(value: string): string {
		const numeric = value.replace(/\D/g, "");

		if (numeric.length === 0) return "";

		switch (mode) {
			case "year":
				return numeric.slice(0, 4);
			case "month":
				if (numeric.length <= 2) return numeric;
				if (numeric.length <= 6) return `${numeric.slice(0, 2)}/${numeric.slice(2)}`;
				return `${numeric.slice(0, 2)}/${numeric.slice(2, 6)}`;
			case "day":
			default:
				if (numeric.length <= 2) return numeric;
				if (numeric.length <= 4) return `${numeric.slice(0, 2)}/${numeric.slice(2)}`;
				if (numeric.length <= 8) return `${numeric.slice(0, 2)}/${numeric.slice(2, 4)}/${numeric.slice(4)}`;
				return `${numeric.slice(0, 2)}/${numeric.slice(2, 4)}/${numeric.slice(4, 8)}`;
		}
	}

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const formatted = formatInput(e.target.value);
		setStringDate(formatted);

		const dateFormat = getDateFormat();
		let isComplete = false;

		switch (mode) {
			case "year":
				isComplete = formatted.length === 4;
				break;
			case "month":
				isComplete = formatted.length === 7; // MM/yyyy
				break;
			case "day":
			default:
				isComplete = formatted.length === 10; // dd/MM/yyyy
				break;
		}

		if (isComplete) {
			const parsed = parse(formatted, dateFormat, new Date());
			if (isValid(parsed) && parsed >= minDate && parsed <= maxDate) {
				setInternalDate(parsed);
				onChange(format(parsed, dateFormat));
			} else {
				setInternalDate(undefined);
				onChange(undefined);
			}
		} else {
			setInternalDate(undefined);
			onChange(undefined);
		}
	}

	function handleSelectDate(date: Date | undefined) {
		if (!date) return;
		if (date >= minDate && date <= maxDate) {
			const dateFormat = getDateFormat();
			setInternalDate(date);
			setStringDate(format(date, dateFormat));
			onChange(format(date, dateFormat));
		}
	}

	const getMaxLength = () => {
		switch (mode) {
			case "year":
				return 4;
			case "month":
				return 7; // MM/yyyy
			case "day":
			default:
				return 10; // dd/MM/yyyy
		}
	};

	const getCalendarMode = () => {
		switch (mode) {
			case "month":
				return "single";
			case "year":
				return "single";
			case "day":
			default:
				return "single";
		}
	};

	function handleMonthSelect(date: Date | undefined) {
		if (!date) return;
		if (date >= minDate && date <= maxDate) {
			const dateFormat = getDateFormat();
			setInternalDate(date);
			setStringDate(format(date, dateFormat));
			onChange(format(date, dateFormat));
		}
	}

	return (
		<Popover>
			<div className="flex items-center">
				<Input
					disabled={disabled}
					type="text"
					value={stringDate}
					onChange={handleInputChange}
					placeholder={getPlaceholder()}
					maxLength={getMaxLength()}
					inputMode="numeric"
					className={cn("rounded-r-none border-r-0", className)}
				/>
				<PopoverTrigger asChild disabled={disabled}>
					<div
						className={cn(
							"group border-outline-field hover:bg-custom-primary border-neutral-40 flex h-10 items-center justify-center rounded-3xl rounded-l-none border border-l-0 px-4 py-1 transition-all peer-focus-visible:ring-1 peer-focus-visible:outline-none hover:cursor-pointer",
							className,
						)}
					>
						<CalendarMark />
					</div>
				</PopoverTrigger>
			</div>
			{!disabled && (
				<PopoverContent className="w-auto p-0">
					{mode === "month" ? (
						<MonthSelector selected={internalDate} onSelect={handleMonthSelect} minDate={minDate} maxDate={maxDate} />
					) : mode === "year" ? (
						<YearSelector selected={internalDate} onSelect={handleSelectDate} minDate={minDate} maxDate={maxDate} />
					) : (
						<Calendar
							mode={getCalendarMode() as any}
							selected={internalDate}
							onSelect={handleSelectDate}
							hidden={{ before: minDate, after: maxDate }}
							initialFocus
							captionLayout="dropdown"
							defaultMonth={internalDate}
						/>
					)}
				</PopoverContent>
			)}
		</Popover>
	);
}

interface DateRangePickerProps {
	startValue?: string;
	endValue?: string;
	onStartChange: (value: string | undefined) => void;
	onEndChange: (value: string | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	yearLimitPast?: number;
	yearLimitFuture?: number;
}

export function DateRangePicker({
	startValue,
	endValue,
	onStartChange,
	onEndChange,
	placeholder = "Selecione o período",
	disabled = false,
	className,
	yearLimitPast = 100,
	yearLimitFuture = 50,
}: DateRangePickerProps) {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	const minDate = yearLimitPast ? subYears(new Date(), yearLimitPast) : new Date(1900, 0, 1);
	const maxDate = addYears(new Date(), yearLimitFuture);

	useEffect(() => {
		if (startValue) {
			const parsed = parse(startValue, "dd/MM/yyyy", new Date());
			if (isValid(parsed)) {
				setStartDate(parsed);
			}
		} else {
			setStartDate(undefined);
		}
	}, [startValue]);

	useEffect(() => {
		if (endValue) {
			const parsed = parse(endValue, "dd/MM/yyyy", new Date());
			if (isValid(parsed)) {
				setEndDate(parsed);
			}
		} else {
			setEndDate(undefined);
		}
	}, [endValue]);

	function handleRangeSelect(range: { from?: Date; to?: Date } | undefined) {
		if (range?.from) {
			setStartDate(range.from);
			onStartChange(format(range.from, "dd/MM/yyyy"));
		}
		if (range?.to) {
			setEndDate(range.to);
			onEndChange(format(range.to, "dd/MM/yyyy"));
		}
	}

	const displayText = () => {
		if (startDate && endDate) {
			return `${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`;
		}
		if (startDate) {
			return `${format(startDate, "dd/MM/yyyy")} - ...`;
		}
		return placeholder;
	};

	return (
		<Popover>
			<div className="flex items-center">
				<Input
					disabled={disabled}
					type="text"
					value={displayText()}
					placeholder={placeholder}
					readOnly
					className={cn("cursor-pointer rounded-r-none border-r-0", className)}
				/>
				<PopoverTrigger asChild disabled={disabled}>
					<div
						className={cn(
							"group border-outline-field hover:bg-custom-primary border-neutral-40 flex h-10 items-center justify-center rounded-3xl rounded-l-none border border-l-0 px-4 py-1 transition-all peer-focus-visible:ring-1 peer-focus-visible:outline-none hover:cursor-pointer",
							className,
						)}
					>
						<CalendarMark />
					</div>
				</PopoverTrigger>
			</div>
			{!disabled && (
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="range"
						selected={{ from: startDate, to: endDate }}
						onSelect={handleRangeSelect}
						hidden={{ before: minDate, after: maxDate }}
						initialFocus
						captionLayout="dropdown"
						numberOfMonths={2}
					/>
				</PopoverContent>
			)}
		</Popover>
	);
}
