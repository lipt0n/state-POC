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
1. there are many solutions that can help to test sagas, like redux-saga-test-plan ( https://github.com/jfairbank/redux-saga-test-plan ) that makes testing saga much better, as shown here : https://github.com/lipt0n/state-POC/blob/7bfe13d3836c35501dcb186c77af6a7e8a428271/reduxsaga/src/redux/ducks/steps.test.js#L44

### redux-observable
???

### mobx
1. easy and straightforward : https://github.com/lipt0n/state-POC/blob/master/mobxtest/src/store/operators.test.js



## readability
### redux
its fine, with complex projects and a lot of actions creators / selectors / reducers can get a bit messy. 

### redux-sagas
not bad, generators are pretty straightforward, but with bigger projects tend to get messy, it can be tricky to keep easy to read flow of information, one action can be handled in multiple palaces, sagas can be forked etc... so without proper planning things can easly get out of control.

### redux-observable
looks jibberish to me, without proper knowledge I'm unable to tell what this part of code is doing
### mobx 
clear winner in this category, code looks elegant and simple. Looks like normal javascript objects, but under the hood magic happens - mobx is using proxy to observe / modify everything. Without knowing mobx You can easly tell what is going on in code. 
## documentation
### redux
great, in my opinion it's why redux become popular - it's simple and well documented
### redux-sagas
good, everything is very well described
### redux-observable
looks jibberish to me, without proper knowledge I'm unable to tell what this part of code is doing
### mobx 
very good, well balanced - it have everything I need to start and not too much, so You won't feel overwhelmed


## community
### redux 
redux is very popular, and ommunity around it is very big, clear winner in this round

### redux-sagas
it's alive
### redux-observable
it's alive
### mobx 
it's alive


## debug tools

### redux 
great Redux DevTools  (https://github.com/reduxjs/redux-devtools)
### redux-sagas
no debug tools I know of
### redux-observable
no debug tools I know of
### mobx 
1. https://github.com/mobxjs/mobx-devtools 
