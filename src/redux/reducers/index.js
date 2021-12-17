import { combineReducers } from "redux";
import signIn from "./signIn";
import signOut from "./signOut";
import user from "./user";
import locations from "./location.all";
import industries from "./industry.all";
import talent from "./talent";
import talents from "./talent.all";
import talentFiles from "./talent.file.all";
import talentFileUpload from "./talent.file.upload";
import talentFileDestroy from "./talent.file.destroy";
import statuses from "./status.all";
import functionalTitles from "./functionalTitle.all";
import seniorities from "./seniority.all";
import company from "./company";
import companies from "./company.all";
import companyTypes from "./company.type";
import processStatuses from "./processStatus.all";
import relocations from "./relocation.all";
import currencies from "./currency.all";
import searcher from "./searcher";

const reducers = combineReducers({
  signIn,
  signOut,
  user,
  locations,
  industries,
  talent,
  talents,
  talentFiles,
  talentFileUpload,
  talentFileDestroy,
  statuses,
  functionalTitles,
  seniorities,
  company,
  companies,
  companyTypes,
  processStatuses,
  relocations,
  currencies,
  searcher,
});

export default reducers;
