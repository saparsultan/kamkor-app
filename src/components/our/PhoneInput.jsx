import React, { useState } from 'react';
import {Input} from "@/components/ui/input";

function PhoneInput({ onChange, type, id }) {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        let input = e.target.value.replace(/\D/g, ''); // Убираем все нецифровые символы

        // Ограничиваем ввод до 11 цифр
        if (input.length > 11) {
            input = input.slice(0, 11);
        }

        // Форматируем ввод в нужный формат "7 (777) 777-77-77"
        const formattedValue = input.replace(
            /^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/,
            (_, g1, g2, g3, g4, g5) => `${g1} (${g2}) ${g3}-${g4}-${g5}`
        );

        setValue(formattedValue);
        onChange(input); // Передаем только цифры
    };

    return (
        <Input
            className="col-span-3"
            id={id}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder="7 (777) 777-77-77"
            maxLength={17} // Максимальная длина ввода с учетом символов форматирования
        />
    );
}

export default PhoneInput;