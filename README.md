# state-POC
## summary
<table border="1">
<thead>
<caption>summary (x/5 more is better)</caption>
<tr>
<th>:bookmark:name</th>
<th>:hammer_and_wrench:testability</th>
<th>:mag_right:readability</th>
<th>:blue_book:documentation</th>
<th>:family:community</th>
<th>:beetle:debug tools</th>
<th>:clock10:learning curve</th>
</tr></thead>
<tbody>
<tr>
<td>redux</td>
<td>:star::star::star::star::star:</td>
<td>:star::star::star::star:</td>
<td>:star::star::star::star::star:</td>
<td>:star::star::star::star::star:</td>
<td>:star::star::star::star::star:</td>
<td>:star::star::star::star::star:</td>
</tr>
<tr>
<td>redux-sagas</td>
<td>:star::star::star:</td>
<td>:star::star::star:</td>
<td>:star::star::star::star::star:</td>
<td>:star::star:</td>
<td>:star:</td>
<td>:star::star::star:</td>
</tr>
<tr>
<td>redux-observable</td>
<td>?</td>
<td>?</td>
<td>?</td>
<td>?</td>
<td>:star:</td>
<td>:star:</td>
</tr>
<tr>
<td>mobx</td>
<td>:star::star::star::star::star:</td>
<td>:star::star::star::star::star:</td>
<td>:star::star::star::star:</td>
<td>:star::star:</td>
<td>:star::star::star:</td>
<td>:star::star::star::star::star:</td>
</tr>
</tbody>
</table>



## how it was tested
1. api server ( https://github.com/lipt0n/state-POC/tree/master/server ) is running on port 3001
1. simple react app was created ( https://github.com/lipt0n/state-POC/tree/master/base )
1. react app fetches operators ond steps
1. react app renders graph based on fetched data
1. react app is able to change step configuration and run step
1. react app fetch steps with some interval

### redux + redux-saga
1. fork of app was created ( https://github.com/lipt0n/state-POC/tree/master/reduxsaga ) using redux as state manager and redux-saga for handling side-effects
1. most of the redux/saga code is inside redux folder ( https://github.com/lipt0n/state-POC/tree/master/reduxsaga/src/redux )

### mobx
1. fork of app was created ( https://github.com/lipt0n/state-POC/tree/master/mobxtest ) using mobx to handle state and side-efects
1. most of the mobx code is inside store folder ( https://github.com/lipt0n/state-POC/tree/master/mobxtest/src/store )


## testability
### redux
1. because redux use pure functions as reducers, and store state in one javascript objects it can't be any easier to test 

### redux-saga
1. uses generators, it pretty easy to test step by step, but it also feel some kind of useless, 
it is working, but we have to call .next() on tested generator for every line and pass results of line before into it, it is more like writing same thing twice than like testing reasults .
1. there are many solutions that can help to test sagas, like redux-saga-test-plan ( https://github.com/jfairbank/redux-saga-test-plan ) 
