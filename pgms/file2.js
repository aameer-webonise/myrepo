#1)Print the names and ages of each employee who works in both the Hardware
#department and the Software department.

select emp.name as "Employee Name",emp.age as "Employee Age" from emp inner join
works on emp.id=works.emp_id inner join dept on works.dept_id=dept.id
where dept.name='Hardware' or dept.name='Software';



#2)Print the names of employees comma separated in one column and manager
#name in another column who have same manager (let emp name repeat if 1 emp
#belongs to 2 depts with different managers).

 select ManagerName as Manager,group_concat(distinct(EmployeeName)) as "Employee Name" from
 (select emp.name as ManagerName,dept.manager_id as DeptId from emp
 inner join dept on emp.id=dept.manager_id) as x inner join
 (select emp.name as EmployeeName,dept.manager_id as ManagerId
 from emp inner join works on emp.id=works.emp_id inner join
 dept on works.dept_id=dept.id where emp.id<>dept.manager_id)
 as y on DeptId=ManagerId group by ManagerName;



#3)For each department with more than 20 full-time-equivalent employees (i.e.,
#where the part-time and full-time employees add up to at least that many full time
#employees), print the did together with the number of employees that work in that
#department.

 select W.dept_id, count(W.emp_id)
 from works W group by W.dept_id
 having 2000 < ( select sum(W1.pct_time) from Works W1
 where W1.dept_id = W.dept_id );



#4)Print the name of each employee whose salary exceeds the budget of 
#all of the departments that he or she works in.

 select emp.name from emp where salary>(select max(budget)
 from dept where id in (select dept_id from works where
 works.emp_id=emp.id));



#5)Find the manager_ids of managers who manage only departments with 
#budgets greater than $1 million.

 select manager_id as "Manager ID" from dept where budget>1000000;



#6)Find the names of managers who manage the departments with the 
#largest budgets.

 select id from emp where id in (select manager_id from dept where  budget=(select max(budget) from dept));




#7)If a manager manages more than one department, he or she controls 
#the sum of all the budgets for those departments. Find the manager_ids and 
#names of managers who control more than $5 million.

 select emp.id as "Manager Id",emp.name as "Manager Name" from emp
 where 5000000<(select sum(budget) from dept where  emp.id=dept.manager_id);




#8)Find the manager_ids and names of managers who control the largest #amounts.

select distinct tempD.manager_id from
(select distinct D.manager_id, sum(D.budget) as tempBudget from dept D
group by D.manager_id ) as tempD
where tempD.tempBudget = (select max(tempD2.tempBudget) from
(select distinct D.manager_id, sum(D.budget) AS tempBudget
from Dept D
group by D.manager_id ) as tempD2);



#9)Find the names of managers who manage only departments with 
#budgets larger than $1 million, but at least one department with 
#budget less than $5 million.

 select E.name as "Employee Name"
 from emp E, dept D
 where E.id = D.manager_id group by E.id, E.name
 having min(D.budget) > 1000000
 and min(D.budget) < 50000000;
