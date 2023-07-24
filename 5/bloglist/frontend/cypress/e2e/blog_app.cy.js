describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const superuser = {
      username: 'root',
      name: 'Superuser',
      password: 'supersecret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, superuser)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('.username-input').should('be.visible')
    cy.get('.password-input').should('be.visible')
    cy.get('.login-button').should('be.visible')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('.username-input').type('root')
      cy.get('.password-input').type('supersecret')
      cy.get('.login-button').click()
      cy.get('.logged-user').should('be.visible')
    })

    it('fails with wrong credentials', function() {
      cy.get('.username-input').type('root')
      cy.get('.password-input').type('myemail')
      cy.get('.login-button').click()

      cy.get('.error-message').should('contain', 'wrong username or password')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'root', password: 'supersecret' })
      })

      it('a new blog can be created', function() {
        cy.get('.new-blog-button').click()
        cy.get('.title-input').type('Things to do in Stockholm')
        cy.get('.author-input').type('Stockholm Stad')
        cy.get('.url-input').type('jättebra.se')
        cy.get('.blog-submit-button').click()
        cy.get('.success-message').should('contain', 'a new blog Things to do in Stockholm by Stockholm Stad added')
        cy.get('.listed-blogs').should('contain', 'Things to do in Stockholm')
      })

      describe('and several blogs from different users exist', function() {
        beforeEach(function() {
          const normaluser = {
            username: 'vohy',
            name: 'Oskari',
            password: 'fullstack'
          }
          cy.request('POST', `${Cypress.env('BACKEND')}/users`, normaluser)

          cy.createBlog({ title: 'first super blog', author: 'FS', url:'first.com' })
          cy.createBlog({ title: 'second super blog', author: 'SS', url:'second.com' })
          cy.logOut()

          cy.login({ username: 'vohy', password: 'fullstack' })
          cy.createBlog({ title: 'first normal blog', author: 'FN', url:'first.fi' })

        })
        it('user can like any blog', function() {
          cy.contains('first super blog')
            .find('.show-details-button').click()
          cy.contains('first.com').parent()
            .find('.likes').should('contain', '0')
          cy.contains('first.com').parent()
            .find('.like-button').click()
          cy.contains('first.com').parent()
            .find('.likes').should('contain', '1')

          cy.contains('first normal blog')
            .find('.show-details-button').click()
          cy.contains('first.fi').parent()
            .find('.likes').should('contain', '0')
          cy.contains('first.fi').parent()
            .find('.like-button').click()
          cy.contains('first.fi').parent()
            .find('.likes').should('contain', '1')
        })

        it('only the user who created a blog can see and use its "remove" button', function() {
          cy.contains('first super blog')
            .find('.show-details-button').click()
          cy.contains('first.com').parent().should('be.visible')
            .find('.remove-button').should('not.be.visible')

          cy.contains('first normal blog')
            .find('.show-details-button').click()
          cy.contains('first.fi').parent()
            .find('.remove-button').click()

          cy.contains('first normal blog').should('not.exist')
        })

        it('blogs are ordered according to likes (most likes first)', function() {
          cy.contains('first super blog')
            .find('.show-details-button').click()
          cy.contains('second super blog')
            .find('.show-details-button').click()
          cy.contains('first.com').parent().find('.like-button').as('firstLikeButton')
          cy.contains('first.com').parent().find('.likes').as('firstLikes')
          cy.contains('second.com').parent().find('.like-button').as('secondLikeButton')
          cy.contains('second.com').parent().find('.likes').as('secondLikes')

          cy.get('@secondLikeButton').click()
          cy.get('@secondLikes').should('contain', '1')
          cy.get('.listed-blogs').eq(0).should('contain', 'second super blog')
          cy.get('@firstLikeButton').click()
          cy.get('@firstLikes').should('contain', '1')
          cy.get('@firstLikeButton').click()
          cy.get('@firstLikes').should('contain', '2')
          cy.get('.listed-blogs').eq(0).should('contain', 'first super blog')
        })
      })
    })
  })
})