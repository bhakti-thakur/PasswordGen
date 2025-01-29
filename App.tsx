import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
//form Validation
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckBox from 'react-native-bouncy-checkbox';

const passwordSchema = Yup.object().shape({
  passwordLength : Yup.number()
  .min(4, 'Should be min 4 chars')
  .max(16, 'Should be max 16 chars')
  .required('Length is a required field')
})

const App = () => {
  const [password, setPassword] = useState<string | undefined> ('')
  const [isPassGen, setIsPassGen] = useState(true)

  const [lowercase, setLowercase] = useState(true)
  const [uppercase, setUppercase] = useState(false)
  const [number, setNumber] = useState(false)
  const [symbol, setSymbol] = useState(false)

  const createPassword= (characters: string, passwordLength: number) =>{
    try {
      let result = ''
      for(let i=0; i < passwordLength; i++ ){
        const charIndex = Math.floor(Math.random() * characters.length)
        result += characters.charAt(charIndex)
      }
      return result
      
    } catch (error) {
      console.log(error)
    }
    console.log('Password Generated')
  }

  const generatePassString= (passwordLength:number) =>{
    let characterList = ""
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const numberChars = '0123456789'
    const symbolChars = '!@#$%^&*()_+'

    if(uppercase){ characterList+= uppercaseChars }
    if(lowercase){characterList += lowercaseChars}
    if(number){characterList += numberChars}
    if(symbol){characterList += symbolChars}

    const passwordResult = createPassword(characterList, passwordLength)
    
    setPassword(passwordResult)
    setIsPassGen(true)
  }

  const resetPassword = () =>{
    setPassword('')
    setIsPassGen(false)
    setLowercase(false)
    setUppercase(false)
    setNumber(false)
    setSymbol(false)
  }
  return (
    <ScrollView keyboardShouldPersistTaps= "handled" >
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordSchema}
            onSubmit={values => {
              console.log(values);
              generatePassString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              isSubmitting,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length:</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>{errors.passwordLength}</Text>
                    ) }
                  </View>
                  <TextInput 
                      style={styles.inputStyle} 
                      value={values.passwordLength} 
                      onChangeText={handleChange('passwordLength')}
                      placeholder='Ex: 8'
                      keyboardType='numeric'
                    /> 
                </View>
                <View style={styles.inputOptions}>
                  <Text style={styles.heading}>Include LowerCase</Text>
                  <BouncyCheckBox
                    isChecked={lowercase}
                    onPress={() => setLowercase(!lowercase)}
                    fillColor='#29AB87'
                  />
                </View>
                <View style={styles.inputOptions}>
                  <Text style={styles.heading}>Include UpperCase</Text>
                    <BouncyCheckBox
                      isChecked={uppercase}
                      onPress={() => setUppercase(!uppercase)}
                      fillColor='#29AB87'
                    />
                </View>
                <View style={styles.inputOptions}>
                  <Text style={styles.heading}>Include Numbers</Text>
                    <BouncyCheckBox
                      isChecked={number}
                      onPress={() => setNumber(!number)}
                      fillColor='#29AB87'
                    />
                </View>
                <View style={styles.inputOptions}>
                  <Text style={styles.heading}>Include Symbols</Text>
                    <BouncyCheckBox
                      isChecked={symbol}
                      onPress={() => setSymbol(!symbol)}
                      fillColor='#29AB87'
                    />
                </View>

                <View style={styles.formAction}>
                  <TouchableOpacity 
                    style={styles.button}
                    disabled={!isValid}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.button}
                    onPress={() =>{
                      handleReset();
                      resetPassword();
                    }}
                  >
                    <Text style={styles.buttonText}>Reset Password</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGen? (
          <View style={styles.passGen}>
            <Text style={styles.passGenTitle}>Generated Password:</Text>
            <Text style={styles.passGenDescription}>long press to copy</Text>
            <Text selectable={true} style={styles.passGenText}>{password} </Text>
          </View>
        ) : null }
      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
  },
  formContainer:{
    margin: 8,
    padding: 8,
  },
  title:{
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
    color: '#FFF',
    paddingVertical: 10,
  },
  inputWrapper:{
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn:{
    flexDirection: 'column',
  },
  inputOptions:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  formAction:{
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15,
  },
  buttonText:{
    color:  '#FFF',
  },
  heading:{
    fontSize: 16,
    color:  '#FFF',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
    fontSize: 14,
    color: '#FFF',
  },
  errorText:{
    fontSize: 11,
    color: '#FF0000',
  },
  button:{
    backgroundColor: '#16213e',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passGen:{
    color: '#FFF',
    borderColor: '#16213e',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginHorizontal: 10,
    backgroundColor: '31363F'
  },
  passGenText:{
    color: '#FFF',
    fontSize: 22,
    padding: 8,
    margin: 8,
    textAlign: 'center',
  },
  passGenTitle:{
    color: '#FFF',
    fontSize: 16,
    marginTop: 10,
    padding: 4,
  },
  passGenDescription:{
    color: '#FFF',
    fontSize: 12,
    padding: 4,
  },
})