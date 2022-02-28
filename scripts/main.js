import { updateTimeEvent } from "./time-greeting.js";
import { hideShowThreeDots, hideShowArrowContainer } from "./animation.js";
import { editAndInputNameEvent } from "./name.js";
import { toDoInputEvent } from "./todo-list.js";
import { focusEvent } from "./focus.js";
import { quoteEvent } from "./quote.js";
import { settingsEvent } from "./settings.js";
import { askNameEvent } from "./intro-name.js";

hideShowThreeDots();
hideShowArrowContainer();

updateTimeEvent();

editAndInputNameEvent();

toDoInputEvent();

focusEvent();

quoteEvent();

settingsEvent();

askNameEvent();
