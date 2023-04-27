import {
  GET_STUDENTS,
  GET_PROFESORS,
  GET_MATERIAS,
  GET_MATERIAS_BY_ID,
  GET_MATERIAS_BY_NAME,
  GET_MATERIAS_BY_ANIO,
  CLEAN_DETAIL,
  POST_ALUMNO,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_ERROR,
  GET_USER_DATA_GOOGLE,
  POST_PROFESOR,
  GET_AULAS,
} from "./actionsTypes";
import axios from "axios";

export const getStudents = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/Alumnos");
      const cantPaginas = response.data.pageCount;
      let alumnos = [];
      for (let i = 0; i < cantPaginas; i++) {
        let respuesta = await axios.get(`/Alumnos?page=` + i);
        alumnos.push(respuesta.data.alumnos);
      }
      //console.log(alumnos);
      return dispatch({
        type: GET_STUDENTS,
        payload: alumnos,
      });
    } catch (error) {
      return dispatch({ type: "ERROR", payload: error });
    }
  };
};

export const getProfesors = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/Profesores");
      const cantPaginas = response.data.pageCount;
      let profesores = response.data.profesor;
      return dispatch({
        type: GET_PROFESORS,
        payload: profesores,
      });
    } catch (error) {
      return dispatch({ type: "ERROR", payload: error });
    }
  };
};

export const getProfesor = (username) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/Profesores/getProfesor?username=${username}`);
      const profesor = response.data;
      console.log(profesor);
      return profesor;
    } catch (error) {
      return dispatch({ type: "ERROR", payload: error });
    }
  };
};

export const postAlumno = (form) => {
  return async function (dispatch) {
    await axios.post("/Alumnos/", form);
    dispatch({
      type: POST_ALUMNO,
    });
  };
};

export const postProfesor = (form) => {
  return async function (dispatch) {
    try {
      await axios.post("/Profesores/", form);
      return dispatch({
        type: POST_PROFESOR,
      });
    } catch (error) {
      console.log("entro al catch");
    }
  };
};

export const getMaterias = (page) => {
  return async function (dispatch) {
    const response = await axios.get(`/Materias?page=` + page);
    const materias = response.data;
    dispatch({ type: GET_MATERIAS, payload: materias });
  };
};

export const getMateriasById = (id) => {
  return async function (dispatch) {
    const response = await axios.get("/Materias/getmateria/" + id);
    const materiaById = response.data;
    dispatch({ type: GET_MATERIAS_BY_ID, payload: materiaById });
  };
};

export const getMateriasByName = (name) => {
  return async function (dispatch) {
    try {
      const result = await axios.get(`/Materias?name=${name}`);
      if (result.data.materias.length > 0) {
        dispatch({ type: GET_MATERIAS_BY_NAME, payload: result.data.materias });
      } else {
        window.alert("No hay materias con ese nombre");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMateriasByAnio = (anio) => {
  return async function (dispatch) {
    // try {
    const result = await axios.get(`/Materias/filtermateria?anio=${anio}`);
    const materiaByAnio = result.data;
    dispatch({ type: GET_MATERIAS_BY_ANIO, payload: materiaByAnio });
    console.log(materiaByAnio);

    //     if (result) {
    //       dispatch({ type: GET_MATERIAS_BY_ANIO, payload: result.data.materias });
    //        console.log(result)
    //     } else {
    //       window.alert("No hay materias de este año");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };
};

export const getAulas = () => {
  return async function (dispatch) {
    const response = await axios.get("/Aulas");
    const anio = response.data;
    dispatch({ type: GET_AULAS, payload: anio.aulas });
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
    payload: [],
  };
};

export const loginFailed = (message) => {
  return {
    type: LOGIN_FAILED,
    payload: message,
  };
};

export const loginSuccess = (userData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

export const verifyUserSuccess = (userData) => {
  return {
    type: VERIFY_USER_SUCCESS,
    payload: userData,
  };
};

export const verifyUserError = (message) => {
  return {
    type: VERIFY_USER_ERROR,
    payload: message,
  };
};

export const postlogin = (email, password) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/Login", {
        email,
        password,
      });
      const userData = response.data;
      dispatch({ type: LOGIN_SUCCESS, payload: userData });
      return userData;
    } catch (error) {
      console.log(error);
      dispatch(loginFailed("invalidUser"));
    }
  };
};

export const logout = () => {
  return async function (dispatch) {
    try {
      await axios.post("/Logout");
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGOUT_ERROR });
    }
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error,
  };
};

export const verifiedGoogleLogIn = (email) => async (dispatch) => {
  try {
    const response = await axios.post("/login/google", {
      email,
    });
    const userInfo = response.data;
    dispatch({ type: GET_USER_DATA_GOOGLE, payload: userInfo });
  } catch (error) {
    dispatch({ type: GET_USER_DATA_GOOGLE, payload: false });
  }
};
