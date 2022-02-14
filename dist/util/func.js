import { QUADRANT_LABELS } from "./constants";
export const booleanColorConverter = (value) => value ? String(value) : 'black';
export const quadrantConverter = (value) => {
    value = value ? value : QUADRANT_LABELS.join('');
    try {
        return JSON.parse(value);
    }
    catch {
        return String(value).split('');
    }
};
//# sourceMappingURL=func.js.map